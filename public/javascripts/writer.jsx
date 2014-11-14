var CommentBox = require('./components/comments.jsx');
//var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var React = require('react');
//window.React = React; // export for http://fb.me/react-devtools

//ChatExampleData.init(); // load example data into localstorage

//ChatWebAPIUtils.getAllMessages();

React.render(
    <CommentBox url="comments" pollInterval={2000} />,
    document.getElementById('content')
);

