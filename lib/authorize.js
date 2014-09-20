var roles = rolesConfig,
    dbConf = DBConfig,
    dbConnected = require('./' + dbConf.dbClient);


exports.checkUserRole = function(req, res, next) {

	var matchingRoles = roles.mapping[req.url];
	var userId = req.session.userId;
	// if there are no roles found then its an allowed user
	if(!matchingRoles){
		next();
		return;
	}

	dbConnected.checkUserRole(userId, matchingRoles).then(function(response){

		if(response.allowed){
			next();
		} else {
			res.send('/error');
		}

	});

};

exports.validate = function(username, password){
    return 123;
};
