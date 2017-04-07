var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    _id: String,
    jobTitle: String,
    jobDescription: String,
    address: String
});

mongoose.createConnection('mongodb://localhost:27017/jobcatcher-node');
module.exports = mongoose.model('jobs', jobSchema);