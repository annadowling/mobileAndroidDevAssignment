var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var userSchema = mongoose.Schema({
    token : String,
    email: String,
    firstName: String,
    lastName: String,
    hashed_password: String,
    salt : String,
    temp_str:String
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var User = conn.model('users', userSchema);
module.exports = User;
