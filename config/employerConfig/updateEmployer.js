/**
 * Created by annadowling on 07/04/2017.
 * Class for updating the logged in Employer details
 */
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');


exports.updateEmployer = function (token, companyName, address, password, latitude, longitude, callback) {

    employer.findOne({token: token}, function (err, doc) {
        console.log("employer token is " + token);
        if (doc) {
            if (companyName && companyName != "") {
                doc.companyName = companyName;
            } else if (address && address != "") {
                doc.address = address;
            } else if (password && password != "") {
                var temp = rand(160, 36);
                var newpass = temp + password;
                var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
                doc.hashed_password = hashed_password;
            } else if (latitude && latitude != "") {
                doc.latitude = latitude;
            } else if (longitude && longitude != "") {
                doc.longitude = longitude;
            }

            doc.save(function (err) {
                if (err) {
                    console.log(err);
                    callback({'response': "Error during save, please try again!"});
                } else {
                    callback({
                        'response': "Updated Employer Details"
                    });
                }

            });
        } else {
            callback({'response': "Error updating employer data!"});
        }

    });


};