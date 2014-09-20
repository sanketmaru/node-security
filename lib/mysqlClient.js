var mysql      = require('mysql');
var db      = DBConfig;
var q = require('q');
var encryption = require('./encryption');

var connection = {};

var loadConnection = function(){
	connection = mysql.createConnection({
		host     : db.mysql.databaseConfig.host,
		user     : db.mysql.databaseConfig.user,
		password : db.mysql.databaseConfig.password,
		database : db.mysql.databaseConfig.database,
	});
	connection.connect();
}

var _private = {

	findUserByUsername: function(query, user){
		var deferred = q.defer();
		connection.query(query, user, function(err, rows, response) {
			if(rows.length > 0){
				deferred.resolve(true);
			} else {
				deferred.resolve(false);
			}
		}, function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	},

	insertUser: function(query, user){
		var deferred = q.defer();
		connection.query(query, user, function(response) {
			deferred.resolve(true);
		}, function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	}
}

exports.addUser = function(username, password){

	var hashedPassword = encryption.generateHash(password);

	var deferred = q.defer();
	var insertQuery = 'INSERT INTO user set ?';
	var selectQuery = 'SELECT * from user where username = ?';
	var selectUserData = [username];
	var insertUserData = {name: username, username: username,password:hashedPassword};

	_private.findUserByUsername(selectQuery, selectUserData).then(function(res){
		if(!res){
			_private.insertUser(insertQuery, insertUserData).then(function(res){
				deferred.resolve("New user inserted");
			}, function(err){
				deferred.reject(err)
			});
		} else {
			deferred.resolve("Username already exist");
		}

	}, function(err){
		deferred.reject(err)
	});
	return deferred.promise;
};

exports.addUserRole = function(userId, roleId){

	var deferred = q.defer();
	var query = 'INSERT INTO user_roles set ?';
	var userRole  = {user_id: userId, role_id: roleId};

	connection.query(query, userRole, function(err,response) {
		if(response.length > 0){
			deferred.resolve(response);
		} else {
			deferred.reject("Error while inserting");
		}
	}, function(err){
		deferred.reject("Error while inserting");
	});
	return deferred.promise;
};


exports.signIn = function(username, password){

	var hashedPassword = encryption.generateHash(password);

	var deferred = q.defer();
	var obj = { allowed: false };
	var query = 'SELECT * from user where username = ?';
	connection.query(query, [username], function(err, rows, response) {
		if(rows.length > 0){
			if(hashedPassword === rows[0].password) {
				obj.allowed = true;
				deferred.resolve(obj);
			} else {
				deferred.reject(obj);
			}
		} else {
			deferred.reject(obj);
		}
	}, function(err){
		deferred.reject(obj);
	});
	return deferred.promise;
};

exports.checkUserRole = function(userId,matchingRoles){

	var deferred = q.defer();
	var obj = { allowed: false };
	var query = 'SELECT * from user_role where userId = ? AND role_id IN (?)' ;
	connection.query(query, [userId, matchingRoles], function(response) {
		if(response.length > 0){
			obj.allowed = true;
			deferred.resolve(obj);
		} else {
			deferred.reject(obj);
		}
	}, function(err){
		deferred.reject(obj);
	});
	return deferred.promise;
};

loadConnection();
