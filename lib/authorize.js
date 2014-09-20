var roles = rolesConfig,
    dbConf = DBConfig,
    dbConnected = require('./' + dbConf.dbClient);

exports.signUp = function(req, res, next) {

	var method = req.method == 'GET' ? 'query': 'body';
    var username = req[method].username;
    var password =req[method].password;

	dbConnected.addUser(username, password).then(function(response){
		if(response){
			next();
		} else {
			res.send('/error');
		}
	}, function(err){
		res.send('/error');
	});

}

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
	}, function(err){
		res.send('/error');
	});

};

exports.signIn = function(req, res, next){

	var method = req.method == 'GET' ? 'query': 'body';
    var username = req[method].username;
    var password =req[method].password;
	if(username && password){
        dbConnected.signIn(username, password).then(function(response){
			if(response.allowed){
				req.session.userId= insertedId;
				next();
			} else {
				res.send('/error');
			}

		}, function(err){
			res.send('/error');
		});
    }
};
