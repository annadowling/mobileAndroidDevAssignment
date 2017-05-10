/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
 */
var mongoose = require('mongoose');
var job = require('../../models/job.js');


exports.retrieveJobsList = function (callback) {

    job.find({}, function (err, jobs) {
        var jobMap = {};

        jobs.forEach(function (job) {
            jobMap[job._id] = job;
        });

        if (jobMap) {
            callback({'response': jobMap});
        } else {
            callback({'response': "Error retrieving jobs list data!"});
        }
    });

};