"use strict";

var MarkdownEditor = require('./components/markdown_editor.jsx');
var WriteWebAPIUtils = require('./utils/write_api_utils');
var React = require('react');

React.render(
    <MarkdownEditor />, 
    document.getElementById('editor')
);

WriteWebAPIUtils.getDocument();

