const mainController = require('../controllers/main.controller.js');
var UserProfile = require('../models/users');
var Events = require('../models/events');

module.exports = function(app, passport) {
    // test if server is running
    app.get('/', function(req, res) {
      res.send("successful");
    });

    // get currently logged-in user information
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

    // process the logout form
    app.put('/onlineUsers', function(req, res) {
      req.logout();
      req.session.destroy(function() {
          res.json({message:"logged out"});
      });
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

    // get a list of users going to a specific event
    app.get('/goingEvents/:eventID', mainController.usersGoingEvent);

    // retrieve a list of all users
    app.get('/userlist', mainController.getUsers);

    // retrieve a list of all events marked interested by users
    app.get('/events', mainController.getInterestedEvents);

    // delete the user account
    app.delete('/users/:username', mainController.deleteUser);

    // add an event to a user's interested events list
    app.post('/users/interestedEvents', mainController.addEvent);

    // delete an event from a user's interested events list
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
