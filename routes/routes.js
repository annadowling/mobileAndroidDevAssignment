/**
 * Created by annadowling on 05/03/2017.
 */

var chgpass = require('../config/userConfig/chgpass.js');
var register = require('../config/userConfig/register');
var login = require('../config/userConfig/login');
var employerLogin = require('../config/employerConfig/employerLogin');
var retrieveEmployer = require('../config/employerConfig/retrieveEmployer');
var employerRegister = require('../config/employerConfig/registerEmployer');
var addJob = require('../config/employerConfig/addJob');
var addJobToUser = require('../config/userConfig/addJobToUser');
var retrieveUser = require('../config/userConfig/retrieveUser');
var updateUser = require('../config/userConfig/updateUser');
var updateEmployer = require('../config/employerConfig/updateEmployer');
var getJobslistEmployer = require('../config/employerConfig/getJobList');
var findEmployerAndJob = require('../config/employerConfig/findEmployerAndJob');
var deleteJob = require('../config/employerConfig/deleteJob');
var fs = require('fs');
var getAllJobslist = require('../config/userConfig/getAllJobslist');


module.exports = function (app) {


    app.get('/', function (req, res) {

        res.end("JobCatcher-Node-Project");
    });


    app.post('/login', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        login.login(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/employerLogin', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        employerLogin.employerLogin(email, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/register', function (req, res) {
        var email = req.body.email;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;

        register.register(email, firstName, lastName, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/registerEmployer', function (req, res) {
        var email = req.body.email;
        var companyName = req.body.companyName;
        var address = req.body.address;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var password = req.body.password;

        employerRegister.register(email, companyName, address, latitude, longitude, password, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/addJob', function (req, res) {
        var employerEmail = req.body.email;
        var employerPhone = req.body.contactNumber;
        var jobTitle = req.body.jobTitle;
        var jobDescription = req.body.jobDescription;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;


        addJob.addJob(employerEmail, employerPhone, jobTitle, jobDescription, latitude, longitude, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/api/chgpass', function (req, res) {
        var id = req.body.id;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;

        chgpass.cpass(id, opass, npass, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/api/resetpass', function (req, res) {

        var email = req.body.email;

        chgpass.respass_init(email, function (found) {
            console.log(found);
            res.json(found);
        });
    });


    app.post('/api/resetpass/chg', function (req, res) {

        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;

        chgpass.respass_chg(email, code, npass, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/addJobToUser', function (req, res) {
        var jobId = req.body.jobId;
        var userEmail = req.body.userEmail;

        addJobToUser.addJobToUser(jobId, userEmail, function (found) {
            console.log(found);
            res.json(found);
        });
    });

    app.get('/getUserDetails/token=:token', function (req, res) {

        var url = req.url;
        var token = url.split("=");
        var parsedToken = token[1];

        console.log("Request token is " + parsedToken);
        retrieveUser.retrieveUser(parsedToken, function (found) {
            console.log("found is " + JSON.stringify(found));
            res.json(found);
            console.log("response sent");
        });
    });

    app.delete('/deleteJob', function (req, res) {

        console.log(JSON.stringify(req.headers));

        var parsedToken = req.headers['token'];
        var parsedEmployerToken = req.headers['employertoken'];

        console.log("Request token is " + parsedToken);
        console.log("Request employer token is " + parsedEmployerToken);
        deleteJob.deleteJob(parsedToken, parsedEmployerToken, function (found) {
            res.json(found);
            console.log("response sent");
        });
    });

    app.post('/updateUser/token=:token', function (req, res) {

        var url = req.url;
        var token = url.split("=");
        var parsedToken = token[1];
        var age = req.body.age;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var bio = req.body.bio;
        var profession = req.body.profession;

        console.log("Request token is " + parsedToken);
        updateUser.updateUser(parsedToken, firstName, lastName, password, age, profession, bio, function (found) {
            console.log("found is " + JSON.stringify(found));
            res.json(found);
            console.log("response sent");
        });
    });

    app.post('/updateEmployer/token=:token', function (req, res) {

        var url = req.url;
        var token = url.split("=");
        var parsedToken = token[1];
        var companyName = req.body.companyName;
        var password = req.body.password;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var address = req.body.address;

        console.log("Request token is " + parsedToken);
        updateEmployer.updateEmployer(parsedToken, companyName, address, password, latitude, longitude, function (found) {
            console.log("found is " + JSON.stringify(found));
            res.json(found);
            console.log("response sent");
        });
    });

    app.get('/getEmployerDetails/token=:token', function (req, res) {

        var url = req.url;
        var token = url.split("=");
        var parsedToken = token[1];

        console.log("Request token is " + parsedToken);
        retrieveEmployer.retrieveEmployer(parsedToken, function (found) {
            console.log("found is " + JSON.stringify(found));
            res.json(found);
            console.log("response sent");
        });
    });

    app.get('/getEmployerJobsList/token=:token', function (req, res) {

        var url = req.url;
        var token = url.split("=");
        var parsedToken = token[1];

        console.log("Request token is " + parsedToken);
        getJobslistEmployer.retrieveEmployerJobsList(parsedToken, function (found) {
            res.json(found);
            console.log("response sent");
        });

    });

    app.get('/findEmployerAndJob/token=:token', function (req, res) {

        var url = req.url;
        var token = url.split("=");
        var parsedToken = token[1];

        console.log("Request token is " + parsedToken);
        findEmployerAndJob.retrieveEmployerAndJob(parsedToken, function (found) {
            res.json(found);
            console.log("response sent");
        });

    });

    app.get('/getAllJobsList', function (req, res) {
        getAllJobslist.retrieveJobsList(function (found) {
            res.json(found);
            console.log("response sent");
        });

    });

    app.post('/upload', function (req, res) {
        console.log("request is " + req.file);
        var buffer = new Buffer(req.body.file, 'base64')
        var decodedPath = buffer.toString();
        console.log("decodedPath is " + decodedPath);
        fs.readFile(decodedPath, function (err, data) {
            var dirname = "/Users/annadowling/Documents/mscMobileAppDevelopment/jobcatcher-node/file-upload";
            var newPath = dirname + "/uploads/" + decodedPath;
            fs.writeFile(newPath, data, function (err) {
                if (err) {
                    res.json({'response': "Error"});
                } else {
                    res.json({'response': "Saved"});
                }
            });
        });
    });


    app.get('/uploads/:file', function (req, res) {
        file = req.params.file;
        var dirname = "/Users/annadowling/Documents/mscMobileAppDevelopment/jobcatcher-node/file-upload";
        var img = fs.readFileSync(dirname + "/uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(img, 'binary');

    });
};
