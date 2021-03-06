/**
 * Created by annadowling on 05/03/2017.
 * User data model
 */
var mongoose = require('mongoose');
var job = require('../models/job.js');
 
var userSchema = mongoose.Schema({
    token : String,
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hashed_password: { type: String, required: true },
    salt : String,
    temp_str:String,
    age: { type: String, required: false },
    profession: {type: String, required: false},
    bio: {type: String, required: true}
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var User = conn.model('users', userSchema);
module.exports = User;
