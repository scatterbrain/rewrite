var express = require('express'),
    router = express.Router(), 
    React = require('react'), 
    Git = require('nodegit'), 
    util = require('util');

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

router.get('/repo', function(req, res) {
    console.log("Call repository init " + util.inspect(Git.Repository.init("/Users/mbhamala/tmp/", false).then(function(err, repo) { return 1; })));
    Git.Repository.init("/Users/mbhamala/tmp/", false) 
        .then(function(err, repo) {
            console.log("Repor cre"); 
        });

    // Clone a given repository into a tmp folder.
    Git.Clone.clone("git://github.com/nodegit/nodegit", "tmp").then(function(repo) {
        console.log("Cloned");
    });

    res.render('index', {title : 'Repo created'});
});

module.exports = router;
