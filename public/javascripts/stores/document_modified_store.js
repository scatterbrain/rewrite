"use strict";

var WriteDispatcher = require('../dispatcher/write_dispatcher'),
    WriteConstants = require('../constants/write_constants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    WriteStore = require('../stores/write_store'),
    
    ActionTypes = WriteConstants.ActionTypes,
    CHANGE_EVENT = 'change';

//TODO: Make this a state (modified, saving, saved)
var _modified = false;

var DocumentModifiedStore = assign({}, EventEmitter.prototype, {
  
  emitChange : function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener : function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener : function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isModified : function() {
    return _modified;
  }

});

DocumentModifiedStore.dispatchToken = WriteDispatcher.register(function(payload) {
  //Execute only after WriteStore
  WriteDispatcher.waitFor([
    WriteStore.dispatchToken
  ]);

  var action = payload.action;

  switch (action.type) {
    case ActionTypes.EDIT:
      _modified = true;
      DocumentModifiedStore.emitChange();
      break;

    case ActionTypes.PUBLISH:
      _modified = false;
      DocumentModifiedStore.emitChange();
      break;

    default:
  }
});

module.exports = DocumentModifiedStore;
