var UserProfile = require('../models/users');

module.exports = {
  seedUser : seedUser,
  login : login,
  signup : signup,
  Jacky_add: Jacky_add
}

function seedUser(req, res) {
    var user = new UserProfile({username:"user1", email:"email", password:"password", events:[]});
    user.save();

    UserProfile.find({})
    .then(function(data) {
      console.log(data);
    });
}


function Jacky_add(req, res) {

    UserProfile.update({
            username:req.body.username
        }, {
            $push: {
                events: req.body.event_ID
            }
        }, {
            upsert: true
        },
        function(err, result) {
            if (err) {
                res.status(404);
                res.send(err);
            } else {
              console.log(result);
            }
        });

    UserProfile.findOne({username:req.body.username})
    .then(function(data) {
      console.log(data);
    });
}

function login(req, res) {
    passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    });
}

function signup(req, res) {
    passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    });
}
