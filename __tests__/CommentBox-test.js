/** @jsx React.DOM */

jest
    .dontMock('../public/javascripts/comments.jsx');

describe('CommentBox', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var CommentBox = require('../public/javascripts/comments.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render a commentbox with label in the document
    var commentbox = TestUtils.renderIntoDocument(
      <CommentBox url="comments" pollInterval={2000} />
    );

    /*
    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'label');
    expect(label.getDOMNode().textContent).toEqual('2000');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');
    */
  });
});
