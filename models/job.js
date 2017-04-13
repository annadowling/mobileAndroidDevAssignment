/**
 * Created by annadowling on 05/03/2017.
 */
var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    _id: String,
    jobTitle: { type: String, required: true },
    contactNumber: { type: String, required: true },
    jobDescription: { type: String, optional: true }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var Job = conn.model('jobs', jobSchema);
module.exports = Job;