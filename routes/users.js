var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res) {
  res.send('respond with a resource');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
