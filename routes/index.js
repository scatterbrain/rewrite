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
    var props = {url : "comments", pollInterval : 2000};
    var commentContents = React.renderToString(comments(props));
    var editorContents = React.renderToString(editor({}));
    res.render('index', { title: 'Express', content : commentContents, editor : editorContents });
});

module.exports = router;
