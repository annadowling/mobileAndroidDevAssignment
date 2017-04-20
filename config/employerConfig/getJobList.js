/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
 */
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');
var job = require('../../models/job.js');
var jsonmap = []; // create an empty array


exports.retrieveEmployerJobsList = function (token, callback) {

    employer.findOne({token: token}, function (err, doc) {
        console.log("employer token is " + token);
        if (doc) {
            var jobsList = doc.jobsList;
            jobsList.forEach(function (jobToken) {
                console.log("jobToken is" + jobToken);

                job.findOne({token: jobToken._id}, function (err, foundJob) {
                    jsonmap.push({
                        key: "job",
                        value: foundJob
                    });

                });

            });
            callback(jsonmap);
        } else {
            callback({'response': "Error retrieving jobs list data!"});
        }

    });
};