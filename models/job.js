var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    _id: String,
    jobTitle: String,
    contactNumber: String,
    jobDescription: String,
    address: String
});

var conn = mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
var Job = conn.model('jobs', jobSchema);
module.exports = Job;