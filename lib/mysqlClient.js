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


exports.addUser = function(username, password){

	var hashedPassword = encryption.generateHash(username);

	var deferred = q.defer();
	var query = 'INSERT INTO user VALUES(?,?)';

	connection.query(query, [username, hashedPassword], function(response) {
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

	var hashedPassword = encryption.hashPassword(password);

	var deferred = q.defer();
	var obj = { allowed: false };
	var query = 'SELECT * from user where username = ?';
	connection.query(query, [username], function(err, rows, response) {
		if(response.length > 0){
			if(hashedPassword === response.password) {
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
