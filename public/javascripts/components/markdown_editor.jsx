"use strict";

var React = require('react'), 
    marked = require('marked'), 
    WriteStore = require('../stores/write_store'), 
    WriteViewActionCreator = require('../actions/write_view_action_creators'),
    util = require('util'),
    CodeMirror = React.createFactory(require('react-code-mirror'));     

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

function getStateFromStores() {
    return {
        document : WriteStore.getDocument()
    };
}

var MarkdownEditor = React.createClass({
    
    /**
     * Fetch the initial state to this.state. React callback.
     */
    getInitialState: function() {
        console.log("Initial state " + util.inspect(getStateFromStores()));
        return getStateFromStores();
    },

    /**
     * Component was initialized. React callback.
     */
    componentDidMount: function() {
        WriteStore.addChangeListener(this._onChange);
    },

    /**
     * Component will be de-initialized. React callback.
     */
    componentWillUnmount : function() {
        WriteStore.removeChangeListener(this._onChange);
    },

    /**
     * The data store was updated. Our own data store callback.
     */
    _onChange : function()
    {
        this.setState(getStateFromStores()); 
    },

    /**
     * Something was written on the text field. React callback.
     */
    handleChange: function(textValue) {
        WriteViewActionCreator.textEdited(textValue);
    },
    
    render: function() {
        return (
            <div className="MarkdownEditor">
            <h3>Input</h3>
                <CodeMirror
                    textAreaClassName={['form-control']}
                    value={this.state.document.text}
                    mode="markdown"
                    theme="twilight"
                    lineNumbers={false}
                    firstLineNumber={10}
                    onChange={function (e) {
                              this.handleChange(e.target.value);
                            }.bind(this)}
                />

            <h3>Output</h3>
            <div
            className="content"
            dangerouslySetInnerHTML={{
                __html: marked(this.state.document.text)
            }}
            />
            </div>
        );
    }
});

module.exports = MarkdownEditor;
