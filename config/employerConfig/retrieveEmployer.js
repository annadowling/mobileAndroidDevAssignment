/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
 */
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');


exports.retrieveEmployer = function (token, callback) {

    employer.findOne({token: token}, function (err, doc) {
        console.log("employer token is " + token);
        if (doc) {
            callback({
                'response': "Employer Found",
                'email': doc.email,
                'token': doc.token,
                'companyName': doc.companyName,
                'address': doc.address,
                'latitude': doc.latitude,
                'longitude': doc.longitude
            });
        } else {
            callback({'response': "Error retrieving employer data!"});
        }

    });
};

