const mainController = require('../controllers/main.controller.js');
var UserProfile = require('../models/users');

module.exports = function(app, passport) {
    // home page
    app.get('/home', function(req, res) {
        res.send('hello there ohoho');
    });

    // seed sample user
    app.get('/seedUser', mainController.seedUser);

    // process the login form
    app.post('/login', function(req, res) {
      passport.authenticate('local-login', function(err, user, info) {
        console.log(info);
        if (err) {
          console.error(err);
        }
        res.json({success:user, message:info});
      })(req, res);
    });

    // process the signup form
    app.post('/signup', function(req, res) {
      passport.authenticate('local-signup', function(err, user, info) {
        console.log(info);
        if (err) {
          console.error(err);
        }
        res.json({success:user, message:info});
      })(req, res);
    });
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        res.redirect('/login');
        return false;
    }
}
