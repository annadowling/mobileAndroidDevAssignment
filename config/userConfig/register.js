var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../../models/user.js');


exports.register = function (email, firstName, lastName, password, bio, profession, callback) {

    var x = email;
    if (!(x.indexOf("@") == x.length)) {
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 && password.match(/[0-9]/)) {

            var temp = rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email + rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            var newuser = new user({
                token: token,
                email: email,
                firstName: firstName,
                lastName: lastName,
                hashed_password: hashed_password,
                profession: profession,
                bio: bio,
                salt: temp,
                jobsList: []
            });

            user.find({email: email}, function (err, users) {

                var len = users.length;

                if (len == 0) {
                    newuser.save(function (err) {
                        if (err) {
                            console.log(err);
                            callback({'response': "Error during save, please try again!"});
                        } else {
                            callback({'response': "Sucessfully Registered User"});
                        }

                    });
                } else {

                    callback({'response': "Email already Registered"});

                }
            });
        } else {

            callback({'response': "Password Weak"});

        }
    } else {

        callback({'response': "Email Not Valid"});

    }
}
