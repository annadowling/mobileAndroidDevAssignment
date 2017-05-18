/**
 * Created by annadowling on 05/03/2017.
 * Logged in user join table data model
 */
var mongoose = require('mongoose');

var loggedInUserSchema = mongoose.Schema({
    token : String,
    userId : mongoose.Schema.Types.ObjectId
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var loggedInUser = conn.model('loggedInUsers', loggedInUserSchema);
module.exports = loggedInUser;