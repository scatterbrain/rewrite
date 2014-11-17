"use strict";

var WriteDispatcher = require('../dispatcher/write_dispatcher'),
    WriteConstants = require('../constants/write_constants'),
    ActionTypes = WriteConstants.ActionTypes;

module.exports = {
    textEdited : function(text) {
        WriteDispatcher.handleViewAction({
            type: ActionTypes.EDIT, 
            text: text
        }); 
    }
};
