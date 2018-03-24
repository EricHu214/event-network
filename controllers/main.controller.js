var UserProfile = require('../models/users');

module.exports = {
  seedUser : seedUser,
  login : login,
  signup : signup,
}

function seedUser(req, res) {
    var user = new UserProfile({username:"user1", email:"email", password:"password", events:[]});
    user.save();

    UserProfile.find({})
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
