/**
 * Created by annadowling on 05/03/2017.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var employer = require('../../models/employer.js');


exports.register = function (email, companyName, address, latitude, longitude, password, callback) {

    var x = email;
    if (!(x.indexOf("@") == x.length)) {
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 && password.match(/[0-9]/)) {

            var temp = rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email + rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            var newEmployer = new employer({
                token: token,
                email: email,
                companyName: companyName,
                latitude: latitude,
                longitude: longitude,
                hashed_password: hashed_password,
                salt: temp
            });

            employer.find({email: email}, function (err, employers) {

                var len = employers.length;

                if (len == 0) {
                    newEmployer.save(function (err) {

                        callback({'response': "Sucessfully Registered Employer"});

                    });
                } else {

                    callback({'response': "Email already Registered to another Employer"});

                }
            });
        } else {

            callback({'response': "Password Weak"});

        }
    } else {

        callback({'response': "Email Not Valid"});

    }
}
