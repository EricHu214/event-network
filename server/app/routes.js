const mainController = require('../controllers/main.controller.js');
var UserProfile = require('../models/users');

module.exports = function(app, passport) {
    // home page

    app.get('/checklogin', function(req, res) {
      if (req.session.user) {
        console.log("loading from session");
        UserProfile.findOne({username:req.session.user.username})
        .then(data =>{
          res.json({message:"loggedin", user:data});
        })
      }
      else {
        console.log('no session');
        res.json({user:false, 'message': 'not authenticated'});
      }
    });

    app.get('/goingEvents/:eventID', mainController.usersGoingEvent);

    // seed sample user
    app.get('/seedUser', mainController.seedUser);

    app.get('/logout', function(req, res) {
      req.logout();
      req.session.destroy(function() {
          res.json({message:"logged out"});
      });
    });

    app.get('/', function(req, res) {
      res.send("successfu");
    })

    // process the login form
    app.post('/login', function(req, res) {
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
    app.post('/signup', function(req, res) {
      passport.authenticate('local-signup', function(err, user, info) {
        console.log(info);
        if (err) {
          console.error(err);
        }
        req.session.user = user;
        req.session.save();
        res.json({success:user, message:info});
      })(req, res);
    });


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
