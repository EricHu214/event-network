const mainController = require('../controllers/main.controller.js');
var UserProfile = require('../models/users');

module.exports = function(app, passport) {

    // Query the accounts to implement session management
    app.get('/accounts', function(req, res) {
      if (req.session.user) {
        UserProfile.findOne({username:req.session.user.username})
        .then(data =>{
          res.json({message:"loggedin", user:data});
        })
      }
      else {
        res.json({user:false, 'message': 'not authenticated'});
      }
    });

    // Get list of users going to an event
    app.get('/goingEvents/:eventID', mainController.usersGoingEvent);

    // get seeded user
    app.get('/seedUser', mainController.seedUser);

    // Process the logout form
    app.get('/logoutData', function(req, res) {
      req.logout();
      req.session.destroy(function() {
          res.json({message:"logged out"});
      });
    });

    app.get('/', function(req, res) {
      res.send("successful");
    })

    // process the login form
    app.post('/loginForm', function(req, res) {
      passport.authenticate('local-login', function(err, user, info) {
        console.log(info);
        if (err) {
          console.error(err);
        }
        req.session.user = user;
        req.session.save();
        res.json({success:user, message:info});
      })(req, res);
    });

    // process the signup form
    app.post('/userAccounts', function(req, res) {
      passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
          console.error(err);
        }
        req.session.user = user;
        req.session.save();
        res.json({success:user, message:info});
      })(req, res);
    });

    // post to the interested list of a user
    app.post('/interested', mainController.addEvent);
    app.post('/notInterested', mainController.deleteEvent);
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        return false;
    }
}
