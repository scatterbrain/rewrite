"use strict";

var CommentBox = require('./components/comments.jsx');
var MarkdownEditor = require('./components/markdown_editor.jsx');
var WriteWebAPIUtils = require('./utils/write_api_utils');
var React = require('react');

React.render(
    <CommentBox url="comments" pollInterval={2000} />,
    document.getElementById('content')
);

React.render(
    <MarkdownEditor />, 
    document.getElementById('editor')
);

WriteWebAPIUtils.getDocument();

