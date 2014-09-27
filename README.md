node-security
=============

Node Security Application which will authorize as well as authenticate users.

Currently the configurations are done with mysql db , next version will include configurations with NoSql database as well and a ready login module which will provide authorization for users. The code is also tightly coupled with the configs used. In the next versions users should not be concern with app.js changes and just need to place the configurations.

Below steps needs to be done to use this module :-

1. Create a config directory inside your application folder.
2. Copy sampledb.js and sampleconfig.js and rename it with db.js and config.js and place your configurations in this file. This include db configurations only.
3. In your app.js place the below code to use the SignIn and SignUp features.


Main app.js sample format

var express = require('express');
var DBConfig = require('./config/db');
var rolesConfig = require('./config/roles');
GLOBAL.DBConfig = DBConfig;
GLOBAL.rolesConfig = rolesConfig;
newMod = require('./lib');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: 'xyz'}));

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

app.listen(process.env.PORT || 9001);




