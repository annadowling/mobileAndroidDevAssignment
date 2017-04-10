/**
 * Created by annadowling on 05/03/2017.
 */

var job = require('../models/job.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

var employerSchema = mongoose.Schema({
    token : String,
    email: String,
    companyName: String,
    address: String,
    latitude: String,
    longitude: String,
    hashed_password: String,
    salt : String,
    jobs  : { type: ObjectId, ref: job }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var Employer = conn.model('employers', employerSchema);
module.exports = Employer;
