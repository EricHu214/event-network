var UserProfile = require('../models/users');
var mongoose = require('mongoose');

module.exports = {
  seedUser : seedUser,
  event_add: event_add
}

function seedUser(req, res) {
    var user = new UserProfile({username:"user1", email:"email", password:"password", events:[]});
    user.save();

    UserProfile.find({})
    .then(function(data) {
      console.log(data);
    });
}


function event_add(req, res) {

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
