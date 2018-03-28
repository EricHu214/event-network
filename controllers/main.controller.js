var UserProfile = require('../models/users');
var mongoose = require('mongoose');

module.exports = {
  seedUser : seedUser,
}

function seedUser(req, res) {
    var user = new UserProfile({username:"user1", email:"email", password:"password", events:[]});
    user.save();

    UserProfile.find({})
    .then(function(data) {
      console.log(data);
    });
}
