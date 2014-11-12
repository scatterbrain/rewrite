/** @jsx React.DOM */
var expect = require('chai').expect;

describe('CommentBox', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var CommentBox = require('../public/javascripts/comments.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render a commentbox with label in the document
    var commentbox = TestUtils.renderIntoDocument(
      <CommentBox url="comments" pollInterval={2000} />
    );

    // Verify that commentbox's form is empty by default
    //var form = TestUtils.findRenderedDOMComponentWithTag(
     // commentbox, 'form');
    //expect(form.getDOMNode().textContent).toEqual('2000');

    // Simulate a click and verify that it is now On
    var commentForm = TestUtils.findRenderedDOMComponentWithClass(
      commentbox, 'commentForm');
    
      //TestUtils.Simulate.change(input);
    
    //expect(label.getDOMNode().textContent).toEqual('On');
  });
});
