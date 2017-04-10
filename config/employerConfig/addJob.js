/**
 * Created by annadowling on 07/04/2017.
 */
var crypto = require('crypto');
var rand = require('csprng');
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


    employer.find({email: employerEmail}, function (err, employers) {
        var len = employers.length;

        if (len != 0) {
            newJob.save(function (err) {

                callback({'response': "Sucessfully Added Job"});

            });

            employers.update(
                { '_id' : ObjectId(employer.__id) },
                { $set: { 'jobs': newJob._id }},
                { w : 0 },
                function (err, result) {
                    if (err) throw err;
                    console.log(result);
                })
        } else {

            callback({'response': "Error while creating job"});

        }
    });
}