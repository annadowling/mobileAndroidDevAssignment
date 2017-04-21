/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
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

            var counter = jobsList.length;

            jobsList.forEach(function (jobToken, index) {
                console.log("jobToken is" + jobToken);
                console.log(jobToken + ' started ...');

                job.findOne({_id: jobToken.toString()}, function (err, foundJob) {
                    console.log("found job is " + JSON.stringify(foundJob));
                    array.push(foundJob);
                });

                setTimeout(function () {
                    console.log(index + ': ' + jobToken);
                    counter -= 1;
                    if (counter === 0) {
                    }
                    console.log("array is: " + array);
                    callback({'response': array});
                }, jobToken);

            });
        } else {
            callback({'response': "Error retrieving jobs list data!"});
        }

    });
};