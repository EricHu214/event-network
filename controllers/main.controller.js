var UserProfile = require('../models/users');
var mongoose = require('mongoose');

module.exports = {
  seedUser : seedUser,
  addEvent : addEvent,
  deleteEvent : deleteEvent
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
  UserProfile.findOne({
    username: req.body.username
  })
  .then(data => {
    if(!data.events.includes(req.body.eventID)) {
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
          res.json({message:'added'});
        }
      });
    }
    else {
      res.json({message:'duplicate'});
    }
    // console.log(data);
  })
}

function deleteEvent(req, res) {
  UserProfile.findOne({
    username: req.body.username
  })
  .then(data => {
    if(data.events.includes(req.body.eventID)) {
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
          console.log("deleted");
          res.json({message:'deleted'});
        }
      });
    }
    else {
      console.log("wasn't there");
      res.json({message:'the event was not there'});
    }
  });
}
