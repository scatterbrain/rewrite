"use strict";

var WriteDispatcher = require('../dispatcher/write_dispatcher'),
    WriteConstants = require('../constants/write_constants'),
    WriteStore = require('../stores/write_store'), 
    WriteAPIUtils = require('../utils/write_api_utils'),
    ActionTypes = WriteConstants.ActionTypes;

module.exports = {
    textEdited : function(text) {
        WriteDispatcher.handleViewAction({
            type: ActionTypes.EDIT, 
            text: text
        });
    }, 

    textSaved : function() {
        var document = WriteStore.getDocument();
        WriteAPIUtils.updateDocument(document);
    }
};
