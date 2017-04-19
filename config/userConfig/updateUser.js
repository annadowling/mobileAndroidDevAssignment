/**
 * Created by annadowling on 07/04/2017.
 * Class for updating the logged in User details
 */
var mongoose = require('mongoose');
var user = require('../../models/user.js');


exports.updateUser = function (token, firstName, lastName, password, age, profession, bio, callback) {

    user.findOne({token: token}, function (err, doc) {
        console.log("user token is " + token);
        if (doc) {
            if (firstName && firstName != "") {
                doc.firstName = firstName;
            } else if (lastName && lastName != "") {
                doc.lastName = lastName;
            } else if (password && password != "") {
                var temp = rand(160, 36);
                var newpass = temp + password;
                var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
                doc.hashed_password = hashed_password;
            } else if (age && age != "") {
                doc.age = age;
            } else if (profession && profession != "") {
                doc.profession = profession;
            } else if (bio && bio != "") {
                doc.bio = bio;
            }

            doc.save(function (err) {
                if (err) {
                    console.log(err);
                    callback({'response': "Error during save, please try again!"});
                } else {
                    callback({
                        'response': "Updated User",
                        'email': doc.email,
                        'token': doc.token,
                        'firstName': doc.firstName,
                        'lastName': doc.lastName,
                        'age': doc.age || "",
                        'profession': doc.profession || "",
                        'bio': doc.bio || ""
                    });
                }

            });
        } else {
            callback({'response': "Error updating user data!"});
        }

    });


};