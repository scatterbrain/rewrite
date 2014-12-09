var express = require('express'), 
    router = express.Router(),
    util = require('util'),
    Remote = require('../libs/remote'),     
    //Temporarily use the WriteStore on the server side as well
    WriteStore = require('../public/javascripts/stores/write_store.js');

router.get('/', function(req, res) {
    var remote, cmd, replyDoc;
    //Read from git
    cmd = { cmd : "read" };
    remote = Remote.createRemote('doc.request');
    //Remote connection established, write request
    remote.on('ready', function() {
        console.log("READY");
        remote.write(JSON.stringify(cmd));
    });
    //When we receive reply data
    remote.on('data', function(data) {
      data = JSON.parse(data);

      console.log("Data " + util.inspect(data));
      replyDoc = WriteStore.getDocument();       
      if (data.result === 0) {
        replyDoc.text = data.doc.text; 
      } else {
        console.log(util.inspect(data));
      } 

      res.setHeader('Content-Type', 'application/json');    
      res.send(JSON.stringify(replyDoc));
      console.log("WRITE"); 
      remote.close();
    });

    remote.on('error', function(error) {
        console.log("Error occurred" + error);
        remote.close();
    });

    remote.connect();
    console.log("CONNECT");
});

router.post('/', function(req, res) {
    var validatedDocument, rabbitDoc, remote;
    WriteStore.receiveDocument(req.body);
    validatedDocument = WriteStore.getDocument(); 
    res.setHeader('Content-Type', 'application/json');   
    res.send(JSON.stringify(validatedDocument));

    //Save to git
    rabbitDoc = { cmd : "commit", doc : validatedDocument};
    remote = Remote.createRemote('doc.request');
    //Remote connection established, write request
    remote.on('ready', function() {
        remote.write(JSON.stringify(rabbitDoc));
    });
    remote.on('error', function(error) {
        console.log("Error occurred" + error);
        remote.close();      
    });
    //When we receive reply data
    remote.on('data', function(data) {
        remote.close();
    });
    remote.connect();
});

module.exports = router;

