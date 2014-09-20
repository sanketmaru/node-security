var express = require('express');
var DBConfig = require('./config/db');
var rolesConfig = require('./config/roles');
GLOBAL.DBConfig = DBConfig;
GLOBAL.rolesConfig = rolesConfig;
newMod = require('./lib');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.get('/login', newMod.signIn, function(req, res){
	res.jsonp({
		success:true,
		"message" : "Login Success"
	})
});

app.get('/signUp', newMod.signUp, function(req, res){
	res.jsonp({
		success:true,
		"message" : "signUp Success"
	})
});

app.get('/addUserRole', newMod.addUserRole, function(req, res){
	res.jsonp({
		success:true,
		"message" : "addUserRole Success"
	})
});

app.get('/admin', newMod.checkUserRole, newMod.checkUrlPattern, function(req, res){
	res.jsonp({
		success:true,
		"message" : "admin role Success"
	})
});

app.get('/user', newMod.checkUserRole, newMod.checkUrlPattern, function(req, res){
	res.jsonp({
		success:true,
		"message" : "admin role Success"
	})
});

/*app.get('/radical',newMod.checkUserRole, function(req, res) {
    if(req.session.userId) {
        res.send('Last page was: ' + req.session.lastPage + '. ');
    } else {

    }
});*/
//If you host the application on Modulus the PORT environment variable will be defined,
//otherwise I’m simply using 8080.
app.listen(process.env.PORT || 9001);



