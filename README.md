node-security
=============

Node Security Application which will authorize as well as authenticate users.

node bootstrap application which will give user a ready login module as well as features for adding, updating roles.

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




