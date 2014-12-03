"use strict";

var MarkdownEditor = require('./components/markdown_editor.jsx');
var WriteWebAPIUtils = require('./utils/write_api_utils');
var React = require('react');
require('codemirror/mode/markdown/markdown'); //codemirror markdown mode needs to be picked up here 

WriteWebAPIUtils.getDocument();

React.render(
    <MarkdownEditor />, 
    document.getElementById('editor')
);


