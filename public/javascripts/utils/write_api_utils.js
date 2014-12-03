"use strict";

var WriteServerActionCreators = require('../actions/write_server_action_creators'), 
    request = require('superagent'), 
    util = require('util');

module.exports = {
    getDocument : function() {
        var serverDocument;
        request.get('/documents')
            .accept('json')
            .end(function(res){
                serverDocument = res.body;
                WriteServerActionCreators.receiveDocument(serverDocument); 
            });
    }, 

    updateDocument : function(document) {
        var validatedDocument;
        request.post('/documents')
            .accept('json')
            .send(document)
            .end(function(res) {
                validatedDocument = res.body;
                WriteServerActionCreators.receiveDocument(validatedDocument);       
        });
    }
};
