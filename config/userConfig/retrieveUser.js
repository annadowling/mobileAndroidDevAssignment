/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in User details
 */
var mongoose = require('mongoose');
var user = require('../../models/user.js');


exports.retrieveUser = function (token, callback) {

    user.findOne({token: token}, function (err, doc) {
        console.log("user token is " + token);
        if(doc){
            callback({'response': "User Found", 'email': doc.email, 'token': doc.token, 'firstName': doc.firstName, 'lastName': doc.lastName});
        }else{
            callback({'response': "Error retrieving user data!"});
        }

    });


};

