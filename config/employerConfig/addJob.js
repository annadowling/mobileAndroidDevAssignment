/**
 * Created by annadowling on 07/04/2017.
 */
var mongoose = require('mongoose');
var job = require('../../models/job.js');
var employer = require('../../models/employer.js');


exports.addJob = function (employerEmail, employerPhone, jobTitle, jobDescription, address, callback) {

    var newJob = new job({
        _id: mongoose.Types.ObjectId(),
        jobTitle: jobTitle,
        contactNumber: employerPhone,
        jobDescription: jobDescription,
        address: address

    });

    newJob.save(function (err) {

        employer.find({email: employerEmail}, function (err, employers) {
            employers.jobs.push(newJob);
            employers.save(function (err) {
                // todo
            });
        });


    });
};