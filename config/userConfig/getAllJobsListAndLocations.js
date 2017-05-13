/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
 */
var mongoose = require('mongoose');
var job = require('../../models/job.js');


exports.retrieveJobsList = function (callback) {

    job.find({}, function (err, jobs) {
        if (jobs) {
            var array = []; // create an empty array

            var listLength = jobs.length;
            var itemsProcessed = 0;

            jobs.forEach(function (job) {
                console.log("found job is " + JSON.stringify(job));
                itemsProcessed++;
                array.push(job);
                console.log("a loop");
            });
            if (itemsProcessed === listLength) { // check if all callbacks have been called
                console.log("index is: " + itemsProcessed);
                console.log("list length is: " + listLength);
                console.log("array is: " + array);
                callback({'response': array});
            }
        } else {
            callback({'response': "Error retrieving jobs list data!"});
        }

    });

};