var express = require('express'),
    router = express.Router(), 
    React = require('react');

// so that you are able to require() jsx files
var jsx = require('node-jsx');
jsx.install({extension: '.jsx'});

var comments = React.createFactory(require('./../public/javascripts/components/comments.jsx'));
var editor = React.createFactory(require('./../public/javascripts/components/markdown_editor.jsx'));

/* GET home page. */
router.get('/', function(req, res) {
    var context = require('rabbit.js').createContext();
    context.on('ready', function() {
        console.log("Ready");
        var request = context.socket('REQ');
        request.on("data", function(message) {
            console.log('Handler received message - %j', message);
            //            request.close(); SHOULD BE CLOSED AT SOME LATER TIME. DOESN'T
            //            WORK HERE

        });

        request.connect('doc.request', function() {
            request.write(JSON.stringify({welcome: 'rabbit.js'}), 'utf8');
        });
    });

    var props = {url : "comments", pollInterval : 2000};
    var commentContents = React.renderToString(comments(props));
    var editorContents = React.renderToString(editor({}));
    res.render('index', { title: 'Express', content : commentContents, editor : editorContents });
});

module.exports = router;
