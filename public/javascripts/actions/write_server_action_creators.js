var WriteDispatcher = require('../dispatcher/write_dispatcher.js'),
    WriteConstants = require('../constants/write_constants'), 
    ActionTypes = WriteConstants.ActionTypes;

module.exports = {
    receiveAll : function(serverDocument) {
        WriteDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_SERVER_DOCUMENT, 
            serverDocument : serverDocument
        });
    }
};
