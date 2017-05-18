/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employers advertised jobs list
 */
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');
var job = require('../../models/job.js');


exports.retrieveEmployerJobsList = function (token, callback) {

    employer.findOne({token: token}, function (err, doc) {
        console.log("employer token is " + token);
        var array = []; // create an empty array
        if (doc) {
            var jobsList = doc.jobsList;
            console.log("jobslist is: " + jobsList);

            var listLength = jobsList.length;
            var itemsProcessed = 0;

            jobsList.forEach(function (jobToken) {

                job.findOne({_id: jobToken.toString()}, function (err, foundJob) {
                    console.log("found job is " + JSON.stringify(foundJob));
                    itemsProcessed++;
                    array.push(foundJob);
                    console.log("a loop");

                    if (itemsProcessed === listLength) { // check if all callbacks have been called
                        console.log("index is: " + itemsProcessed);
                        console.log("list length is: " + listLength);
                        console.log("array is: " + array);
                        callback({'response': array});
                    }
                });
            });
        } else {
            callback({'response': "Error retrieving jobs list data!"});
        }

    });
};