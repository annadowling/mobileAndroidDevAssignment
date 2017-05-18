/**
 * Created by annadowling on 05/03/2017.
 * Class for authenticating the employer.
 */
var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var gravatar = require('gravatar');
var employer = require('../../models/employer.js');

exports.employerLogin = function(email,password,callback) {

    employer.find({email: email},function(err, employers){

        if(employers.length != 0){

            var temp = employers[0].salt;
            var hash_db = employers[0].hashed_password;
            var id = employers[0].token;
            var companyName = employers[0].companyName;
            var email = employers[0].email;
            var newpass = temp + password;
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
            var grav_url = gravatar.url(email, {s: '200', r: 'pg', d: '404'});
            if(hash_db == hashed_password){

                callback({'response':"Employer Login Success",'res':true,'token':id,'grav':grav_url, 'companyName': companyName, 'email': email});

            }else{

                callback({'response':"Invalid Password",'res':false});

            }
        }else {

            callback({'response':"Employer not exist",'res':false});

        }
    });
}
