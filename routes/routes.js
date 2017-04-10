/**
 * Created by annadowling on 05/03/2017.
 */

var chgpass = require('../config/userConfig/chgpass.js');
var register = require('../config/userConfig/register');
var login = require('../config/userConfig/login');
var employerLogin = require('../config/employerConfig/employerLogin');
var employerRegister = require('../config/employerConfig/registerEmployer');
var addJob = require('../config/employerConfig/addJob');


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

        employerLogin.login(email, password, function (found) {
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
        var address = req.body.address;


        addJob.addJob(employerEmail, employerPhone, jobTitle, jobDescription, address, function (found) {
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
};
