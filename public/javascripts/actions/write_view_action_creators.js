"use strict";

var WriteDispatcher = require('../dispatcher/write_dispatcher'),
    WriteConstants = require('../constants/write_constants'),
    WriteStore = require('../stores/write_store'), 
    WriteAPIUtils = require('../utils/write_api_utils'),
    ActionTypes = WriteConstants.ActionTypes;

module.exports = {
    textEdited : function(text) {
        var document;
        WriteDispatcher.handleViewAction({
            type: ActionTypes.EDIT, 
            text: text
        });

        document = WriteStore.getDocument();
        WriteAPIUtils.updateDocument(document);
    }
};
