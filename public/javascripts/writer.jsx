"use strict";

var MarkdownEditor = require('./components/markdown_editor.jsx');
var WriteWebAPIUtils = require('./utils/write_api_utils');
var React = require('react');
require('codemirror/mode/markdown/markdown'); //codemirror markdown mode needs to be picked up here 
    
React.render(
    <MarkdownEditor />, 
    document.getElementById('editor')
);


//TODO Uncomment this when you want to read the document from the server
//WriteWebAPIUtils.getDocument();

