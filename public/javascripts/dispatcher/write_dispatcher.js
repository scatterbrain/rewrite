"use strict";

var Dispatcher = require('flux').Dispatcher, 
    assign = require('object-assign'), 
    WriteConstants = require('../constants/write_constants'), 
    PayLoadConstants = WriteConstants.PayLoadSources;

var WriteDispatcher = assign(new Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction : function(action) {
        var payload = {
            source : PayLoadConstants.SERVER_ACTION, 
            action : action
        }; 

        this.dispatch(payload);
    },

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction : function(action) {
        var payload = {
            source : PayLoadConstants.VIEW_ACTION, 
            action : action
        }; 
        this.dispatch(payload);
    }

});

module.exports = WriteDispatcher;
