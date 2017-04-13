/**
 * Created by annadowling on 05/03/2017.
 */

var job = require('../models/job.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

var employerSchema = mongoose.Schema({
    token : String,
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: String, optional: true },
    longitude: { type: String, optional: true },
    hashed_password: { type: String, required: true },
    salt : String,
    jobsList: [{type: mongoose.Schema.Types.ObjectId, ref: 'jobs'}]
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var Employer = conn.model('employers', employerSchema);
module.exports = Employer;
