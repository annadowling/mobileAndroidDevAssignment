/**
 * Created by annadowling on 07/04/2017.
 */
var mongoose = require('mongoose');
var job = require('../../models/job.js');
var employer = require('../../models/employer.js');


exports.addJob = function(employerEmail, employerPhone,jobTitle,jobDescription,address, callback) {

    var newJob = new job({
        jobTitle: jobTitle,
        contactNumber: employerPhone,
        jobDescription: jobDescription,
        address: address

    });

    newJob.save();

    employer.findOneAndUpdate({ email: employerEmail }, { $set: { jobs: newJob } }, function(err, doc) {

    });
}