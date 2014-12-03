var express = require('express'), 
    router = express.Router(),
    util = require('util'), 
    //Temporarily use the WriteStore on the server side as well
    WriteStore = require('../public/javascripts/stores/write_store.js');

router.get('/', function(req, res) {
    var data = WriteStore.getDocument(); 
    res.setHeader('Content-Type', 'application/json');    
    res.send(JSON.stringify(data));
});

router.post('/', function(req, res) {
    var validatedDocument;
    WriteStore.receiveDocument(req.body);
    validatedDocument = WriteStore.getDocument(); 
    res.setHeader('Content-Type', 'application/json');    
    res.send(JSON.stringify(validatedDocument));
});

module.exports = router;

