/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the employer details for a particular job
 */
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');
var job = require('../../models/job.js');


exports.retrieveEmployerAndJob = function (token, callback) {

    employer.findOne({jobsList: token}, function (err, doc) {

        var foundEmployer = doc;
        if (foundEmployer) {
            var jobsList = doc.jobsList;
            console.log("jobslist is: " + jobsList);
            console.log("employer is: " + foundEmployer);

                job.findOne({_id: token.toString()}, function (err, foundJob) {
                    console.log("found job is " + JSON.stringify(foundJob));
                    callback({
                        'response': "User and Employer Found",
                        'email': foundEmployer.email,
                        'companyName': foundEmployer.companyName,
                        'id': foundJob._id,
                        'jobTitle': foundJob.jobTitle,
                        'jobDescription': foundJob.jobDescription,
                        'contactNumber': foundJob.contactNumber,
                        'latitude' : foundJob.latitude,
                        'longitude' : foundJob.longitude
                    });
                });
        } else {
            callback({'response': "Error retrieving job and employer data!"});
        }

    });
};