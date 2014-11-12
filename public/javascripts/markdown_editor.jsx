/** @jsx React.Dom */


var React = require('react');
var marked = require('marked');

var MarkDownEditor = React.createClass({
    getInitialState: function() {
        return {value: 'Type some *markdown* here!'};
    },

    handleChange: function() {
        this.setState({value: this.refs.textarea.getDomNode().value});
    },
    
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="MarkDownEditor">
                <h3>Input</h3>
                <textarea
                    onChange={this.handleChange}
                    ref="textarea"
                    defaultValue="{this.state.value}" />
                    <h3>Output</h3>
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{__html: marked(this.state.value)}}
                    />

            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = MarkDownEditor;
