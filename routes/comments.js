var browserify = require('browserify');
var React = require('react');
var express = require('express');
var router = express.Router();

var comments = [];

var commentsC = React.createFactory(require('./comments.js'));

router.get('/', function(req, res) {
    res.send(JSON.stringify(comments));
});

router.post('/', function(req, res) {
    comments.push(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});

module.exports = router;
