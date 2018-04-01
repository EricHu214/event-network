const mainController = require('../controllers/main.controller.js');
var UserProfile = require('../models/users');
var Events = require('../models/events');

module.exports = function(app, passport) {

    // Get user information
    app.get('/users', function(req, res) {
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

    // process the signup form
    app.post('/users', function(req, res) {
      passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
          console.error(err);
        }
        req.session.user = user;
        req.session.save();
        res.json({success:user, message:info});
      })(req, res);
    });

    // Get list of users going to an event
    app.get('/goingEvents/:eventID', mainController.usersGoingEvent);

    // Process the logout form
    app.put('/onlineUsers', function(req, res) {
      req.logout();
      req.session.destroy(function() {
          res.json({message:"logged out"});
      });
    });

    app.get('/', function(req, res) {
      res.send("successful");
    });

    // process the login form
    app.post('/onlineUsers', function(req, res) {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          console.error(err);
        }
        req.session.user = user;
        req.session.save();
        res.json({success:user, message:info});
      })(req, res);
    });

    app.get('/userlist', function(req, res) {
      UserProfile.find({})
      .then(data => {
        res.json(data);
      });
    })

    app.get('/events', function(req, res) {
      Events.find({})
      .then(data => {
        res.json(data);
      });
    })

    // delete the user account
    app.delete('/users/:username', mainController.deleteUser);

    // post to the interested list of a user
    app.post('/users/interestedEvents', mainController.addEvent);
    app.delete('/users/uninterestedEvents/:eventID/:username', mainController.deleteEvent);
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        return false;
    }
}
