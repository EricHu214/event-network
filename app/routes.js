const mainController = require('../controllers/main.controller.js');
var UserProfile = require('../models/users');

module.exports = function(app, passport) {
    // home page
    app.get('/home', function(req, res) {

        res.send('hello there ohoho');
    });

    // seed sample user
    app.get('/seedUser', mainController.seedUser);

    app.get('/logout', function(req, res) {
        req.logout();
        req.session.save(function() {
            res.json({message:"logged out"});
        });
    });

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

    app.post('/add_event', function(req, res) {
      console.log(req.user);
        UserProfile.update({
            username: req.body.username
        }, {
          $push: {
            events: req.body.eventID
          }
        },
        function(err, result) {
          if(err) {
            res.status(404);
            res.send(err);
          } else {
            //console.log(result);
          }
        });
        //console.log('omg why is this not working??????');
        /*UserProfile.findOne({username:req.user.username})
        .then(function(data) {
            console.log("OMG OMG OMG OMG" + data);
        });*/
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
