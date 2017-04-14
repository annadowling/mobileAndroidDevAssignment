/**
 * Created by annadowling on 05/03/2017.
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
    jobsList: [{type: mongoose.Schema.Types.ObjectId, ref: 'jobs'}]
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var User = conn.model('users', userSchema);
module.exports = User;
