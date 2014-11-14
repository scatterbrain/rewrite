var express = require('express'),
    router = express.Router(), 
    React = require('react');

// so that you are able to require() jsx files
var jsx = require('node-jsx');
jsx.install({extension: '.jsx'});

var comments = React.createFactory(require('./../public/javascripts/components/comments.jsx'));

/* GET home page. */
router.get('/', function(req, res) {
    var props = {url : "comments", pollInterval : 2000};
    var commentContents = React.renderToString(comments(props));
    res.render('index', { title: 'Express', content : commentContents });
});

module.exports = router;
