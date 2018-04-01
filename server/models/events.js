// models/events.js
// Schema that represents many-to-many relationships with users
// A schema that pairs event with a list of users
var mongoose = require('mongoose');

// define the schema for our events model
var eventSchema = mongoose.Schema({

    id                : String,
    interestedUsers   : [String], // usernames for going users

});

// create the model for events and generalize it to our app
module.exports = mongoose.model('Event', eventSchema);
