var express = require('express');
var DBConfig = require('./sampleconfig/sampledb');
var rolesConfig = require('./sampleconfig/sampleroles');
GLOBAL.DBConfig = DBConfig;
GLOBAL.rolesConfig = rolesConfig;
var newMod = require('nodesecurity');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(cookieParser());
app.use(session({secret: 'xyz'}));

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



