/**
 * Created by annadowling on 07/04/2017.
 * Class for adding a job and storing a job reference on the employer document
 */
var mongoose = require('mongoose');
var job = require('../../models/job.js');
var employer = require('../../models/employer.js');


exports.addJob = function (employerEmail, employerPhone, jobTitle, jobDescription, latitude, longitude, callback) {

    var newJob = new job({
        _id: mongoose.Types.ObjectId(),
        jobTitle: jobTitle,
        contactNumber: employerPhone,
        jobDescription: jobDescription,
        latitude: latitude,
        longitude: longitude

    });
    console.log(newJob);

    newJob.save(function (err) {
        if (err) {
            console.log(err);
            callback({'response': "Validation failed for saving job, please try again!"});
        } else {

            employer.findOne({email: employerEmail}, function (err, doc) {
                if (doc) {
                    doc.jobsList.push(newJob._id);
                    doc.save(function(err) {
                        if(err){
                            console.log(err);
                                 callback({'response': "Validation failed for saving job to employer, please try again!"});
                        }   else{
                            callback({'response': "Added Job for " + newJob.jobTitle});
                        }
                    });
                } else {
                    callback({'response': "Email does not match valid email address for the user"});
                }
            });
        }
    });
};

