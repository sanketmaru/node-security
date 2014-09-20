var mysql      = require('mysql');
var db      = require('/config/db');
var q = require('q');


var connection = mysql.createConnection({
  host     : db.mysql.host,
  user     : db.mysql.user,
  password : db.mysql.password
});

connection.connect();

exports.checkUserRole = function(userId, ){

	var deferred = q.defer();
	var obj = { allowed: false };
	var query = 'SELECT * from user_role where userId='+req.session.userId + ' AND role_id IN (' + matchingRoles + ')' ;
	connection.query(query, function(response) {
		if(response.length > 0){
			obj.allowed = true;
			deferred.resolve(obj);
		} else {
			deferred.reject(obj);
		}
	  console.log('The solution is: ', rows[0].solution);
	}, function(err){
		deferred.reject(obj);
	});

}
