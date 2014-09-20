var mysql      = require('mysql');
var db      = require('../config/db');
var q = require('q');


var connection = mysql.createConnection({
  host     : db.mysql.databaseConfig.host,
  user     : db.mysql.databaseConfig.user,
  password : db.mysql.databaseConfig.password
});

connection.connect();

exports.checkUserRole = function(userId,matchingRoles){

	var deferred = q.defer();
	var obj = { allowed: false };
	var query = 'SELECT * from user_role where userId='+ userId + ' AND role_id IN (' + matchingRoles + ')' ;
	connection.query(query, function(response) {
		if(response.length > 0){
			obj.allowed = true;
			deferred.resolve(obj);
		} else {
			deferred.reject(obj);
		}
	  console.log('The solution is: ');
	}, function(err){
		deferred.reject(obj);
	});
return deferred.promise;
};

exports.validate = function() {

};
