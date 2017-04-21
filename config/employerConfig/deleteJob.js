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


exports.deleteJob = function (token, callback) {

    job.findOne({_id: token}, function (err, doc) {
        if(doc){
            doc.remove().exec();
            callback({"response":"Job Deleted"});
        }else{
            callback({'response': "Error while deleting job!"});
        }
    });

};