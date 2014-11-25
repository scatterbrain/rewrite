var express = require('express'),
    router = express.Router(), 
    React = require('react'), 
    Remote = require('../libs/remote');

// so that you are able to require() jsx files
var jsx = require('node-jsx');
jsx.install({extension: '.jsx'});

var editor = React.createFactory(require('./../public/javascripts/components/markdown_editor.jsx'));

/* GET home page. */
router.get('/', function(req, res) {

    //RabbitMQ test
    var remote = Remote.createRemote('doc.request');
    //Remote connection established, write request
    remote.on('ready', function() {
        remote.write(JSON.stringify({welcome: 'rabbit.js'}));
    });
    //When we receive reply data
    remote.on('data', function() {
        remote.close();
    });
    remote.connect();

    var props = {};
    var editorContents = React.renderToString(editor(props));
    res.render('index', { title: 'Express', editor : editorContents });
});

module.exports = router;
