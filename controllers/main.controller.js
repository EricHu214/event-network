var UserProfile = require('../models/users');

module.exports = {
  test : test
}


function test(req, res) {

    var user = new UserProfile({username:"user1", email:"email", password:"password", events:[]});
    user.save();

    UserProfile.find({})
    .then(function(data) {
      console.log(data);
    });
}
