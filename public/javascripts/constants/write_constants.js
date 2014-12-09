var keyMirror = require('keymirror');

module.exports = {

    ActionTypes : keyMirror({
        CREATE : null,
        EDIT : null, 
        RECEIVE_SERVER_DOCUMENT : null, 
        PUBLISH : null,
    }), 

    PayLoadSources : keyMirror({
        SERVER_ACTION : null, 
        VIEW_ACTION : null
    })


};
