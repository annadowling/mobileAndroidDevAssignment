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

    employer.findOne({token: employerToken}, function (err, doc) {
        doc.jobsList.ObjectId.remove(mongoose.type.ObjectId(token), function (err) {
            if (!err) {
                job.remove({_id: token}, function (err) {
                    if (!err) {
                        callback({"response": "Job Deleted"});
                    }
                    else {
                        callback({'response': "Error while deleting job!"});
                    }
                });
            }
            else {
                callback({'response': "Error while deleting job from employer!"});
            }
        });

    });


};