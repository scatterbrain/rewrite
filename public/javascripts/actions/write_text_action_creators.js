var WriteDispatcher = require('../dispatcher/write_dispatcher.js'),
    WriteConstants = require('../constants/write_constants'),
    WriteAPIUtils = require('../utils/write_api_utils'), 
    WriteStore = require('../stores/write_store'), 
    ActionTypes = WriteConstants.ActionTypes;

module.exports = {
    editText : function(text) {
        WriteDispatcher.handleViewAction({
            type: ActionTypes.EDIT, 
            text : text
        });

        var textToSend = getCreatedDocument.getDocument(text);
        WriteAPIUtils.sendEditText(textToSend);
    }
};
