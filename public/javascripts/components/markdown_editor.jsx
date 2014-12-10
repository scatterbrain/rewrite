"use strict";

var React = require('react/addons'), 
    marked = require('marked'), 
    WriteStore = require('../stores/write_store'), 
    DocumentModifiedStore = require('../stores/document_modified_store'),
    WriteViewActionCreator = require('../actions/write_view_action_creators'),
    util = require('util'),
    CodeMirror = require('react-code-mirror');

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
        document : WriteStore.getDocument(),
        modified : DocumentModifiedStore.isModified()
    };
}

var MarkdownEditor = React.createClass({
    
    /**
     * Fetch the initial state to this.state. React callback.
     */
    getInitialState: function() {
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
            <div>
                <div id="in">
                    <EditorToolBar /> 
                    <CodeMirror
                        textAreaClassName={['form-control']}
                        value={this.state.document.text}
                        mode="markdown"
                        theme="rewrite"
                        lineNumbers={false}
                        firstLineNumber={1}
                        extraKeys={{"Enter": "newlineAndIndentContinueMarkdownList"}}
                        onChange={function (e) {
                        this.handleChange(e.target.value);
                        }.bind(this)}
                    />
                </div>

                <div id="out"
                    className="content"
                    dangerouslySetInnerHTML={{
                    __html: marked(this.state.document.text)
                    }}
                />
            </div>
        );
    }
});

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EditorToolBar = React.createClass({
  getInitialState : function() {
    return getStateFromStores();
  }, 

  componentDidMount : function() {
    DocumentModifiedStore.addChangeListener(this._onChange);
  }, 

  componentWillUnmount : function() {
    DocumentModifiedStore.removeChangeListener(this._onChange);
  },

  _onChange : function()
  {
    this.setState(getStateFromStores());
  },

  handleSubmit : function(e) {
    e.preventDefault();
    WriteViewActionCreator.textSaved(); 
  }, 

  render : function() {
    var button = "";
    if (this.state.modified) {   
        button = <button key="publish-button">PUBLISH</button>; 
    }
    return (
      <div className="editor-toolbar">
      <form onSubmit={this.handleSubmit}>
      <ReactCSSTransitionGroup transitionName="button-appear">
        {button}
      </ReactCSSTransitionGroup>
      </form>
      </div>
    ); 
  }
});

module.exports = MarkdownEditor;
