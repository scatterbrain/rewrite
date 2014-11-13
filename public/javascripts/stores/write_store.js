var WriteDispatcher = require('../dispatcher/write_dispatcher'),
    WriteConstants = require('../constants/write_constants'),
    WriteUtils = require('../utils/write_utils'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),

    ActionTypes = WriteConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _currentDocument = {};

var WriteStore = assign({}, EventEmitter.prototype, {
    
    emitChange : function() {
        this.emit(CHANGE_EVENT);
    },
    
    addChangeListener : function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    createDocument : function(text) {
        _currentDocument = {
            id : 'm_' + Date.now(),
            text : text, 
            author : "Foo",
        };
    },

    updateDocument : function(text) {
        _currentDocument.text = text;
    },

    receiveDocument: function(serverDocument) {
        _currentDocument = serverDocument;
    },

    getDocument : function() {
        return assign({}, _currentDocument);
    }
        
});

WriteStore.dispatchToken = WriteDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.CREATE:
            WriteStore.createDocument(action.text);
            WriteStore.emitChange();
            break;

        case ActionTypes.EDIT:
            //Create ordered handlers like this:
            //First update latest history panel
            //WriteDispatcher.waitFor([DocumentHistoryStore.dispatchToken])
            //Then mark the document as saved
            //WriteDispatcher.waitFor([DocumentSaveStateStore.dispatchToken])
            WriteStore.updateDocument(action.text);            
            WriteStore.emitChange();
            break;

        case ActionType.RECEIVE_SERVER_DOCUMENT:
            WriteStore.receiveDocument(action.serverDocument);       
            WriteStore.emitChange();
            break;
        default:
    }
});

module.exports = WriteStore;
