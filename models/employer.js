/**
 * Created by annadowling on 05/03/2017.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var employerSchema = mongoose.Schema({
    token : String,
    email: String,
    companyName: String,
    address: String,
    latitude: String,
    longitude: String,
    hashed_password: String,
    salt : String
});

//mongoose.connect('mongodb://localhost:27017/jobcatcher-node');
module.exports = mongoose.model('employers', employerSchema);
