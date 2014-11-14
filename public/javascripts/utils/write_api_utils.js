"use strict";

var WriteServerActionCreators = require('../actions/write_server_action_creators');

module.exports = {
    getDocument : function() {
        var action = {};
        WriteServerActionCreators.receiveDocument(action); 
    }

};
