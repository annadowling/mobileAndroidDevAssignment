/**
 * Created by annadowling on 07/04/2017.
 * Class for retrieving the logged in Employer details
 */
var mongoose = require('mongoose');
var user = require('../../models/user.js');


exports.retrieveUsersList = function (callback) {

    user.find({}, function (err, users) {
        if (users) {
            var array = []; // create an empty array

            var listLength = users.length;
            var itemsProcessed = 0;

            users.forEach(function (user) {
                console.log("found user is " + JSON.stringify(user));
                itemsProcessed++;
                array.push(user);
                console.log("a loop");
            });
            if (itemsProcessed === listLength) { // check if all callbacks have been called
                console.log("index is: " + itemsProcessed);
                console.log("list length is: " + listLength);
                console.log("array is: " + array);
                callback({'response': array});
            }
        } else {
            callback({'response': "Error retrieving users list data!"});
        }

    });

};