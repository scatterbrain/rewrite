"use strict";

var WriteDispatcher = require('../dispatcher/write_dispatcher'),
    WriteConstants = require('../constants/write_constants'),
    WriteStore = require('../stores/write_store'), //Not used but must be required so that is up and running before we start receiving stuff from the server     
    ActionTypes = WriteConstants.ActionTypes;

module.exports = {
    receiveDocument : function(serverDocument) {
        WriteDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_SERVER_DOCUMENT, 
            serverDocument : serverDocument
        });
    }
};
