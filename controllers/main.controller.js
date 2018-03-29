var UserProfile = require('../models/users');
var mongoose = require('mongoose');

module.exports = {
  seedUser : seedUser,
  addEvent : addEvent,
  deleteEvent : deleteEvent,
}

function seedUser(req, res) {
    var user = new UserProfile({username:"user1", email:"email", password:"password", events:[]});
    user.save();

    UserProfile.find({})
    .then(function(data) {
      console.log(data);
    });
}

function addEvent(req, res) {
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
}

function deleteEvent(req, res) {
    UserProfile.update({
      username: req.body.username
    }, {
      $pull: {
        events: req.body.eventID
      },
    },
    { multi: true },
    function(err, result) {
      if(err) {
        res.status(404);
        res.send(err);
      } else {
        // console.log(result);
      }
    });
}
