/**
 * Created by annadowling on 21/04/2017.
 */

/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
 */
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');
var job = require('../../models/job.js');


exports.deleteJob = function (token, employerToken, callback) {

    employer.findOneAndUpdate({token: employerToken}, {$pull: {jobsList: token}}, function (err, data) {
        if (err) {
            callback({'response': "Error while deleting job for employer! " });
        } else {
            job.remove({_id: token}, function (err) {
                if (!err) {
                    callback({"response": "Job Deleted"});
                }
                else {
                    callback({'response': "Error while deleting job!"});
                }
            });
        }

    });

};