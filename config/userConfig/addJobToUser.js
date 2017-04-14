/**
 * Created by annadowling on 07/04/2017.
 * Class for adding a job and storing a job reference on the employer document
 */
var mongoose = require('mongoose');
var job = require('../../models/job.js');
var user = require('../../models/user.js');


exports.addJob = function (jobId, userEmail, callback) {

    job.findOne({email: userEmail}, function (err, jobRef) {
        if (jobRef) {

            user.findOne({email: userEmail}, function (err, doc) {
                if (doc) {
                    doc.jobsList.push(jobRef._id);
                    doc.save(function (err) {
                        if (err) {
                            console.log(err);
                            callback({'response': "Validation failed for saving job to user, please try again!"});
                        } else {
                            callback({'response': "Added Job Interest to user " + user.firstName + " for " + newJob.jobTitle});
                        }
                    });
                } else {
                    callback({'response': "User not found!"});
                }
            });
        }else{
            console.log(err);
            callback({'response': "Error occured, no job found!"});
        }
    });

}
;

