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
 
mongoose.connect('mongodb://localhost:27017/jobcatcher-node');
module.exports = mongoose.model('users', userSchema);
