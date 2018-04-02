// models/users.js
// Schema that represents a collecton of users
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userProfileSchema = mongoose.Schema({
    username     : String,
    email        : String,
    password     : String,
    description  : String,
    events       : [String]
});

// generating a hash
userProfileSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userProfileSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and generalize it to our app
module.exports = mongoose.model('UserProfile', userProfileSchema);
