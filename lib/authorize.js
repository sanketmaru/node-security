var roles = rolesConfig,
    dbConf = DBConfig,
    dbConnected = require('./' + dbConf.dbClient);

exports.signUp = function(req, res, next) {

	var method = req.method == 'GET' ? 'query': 'body';
    var username = req[method].username;
    var password =req[method].password;

	dbConnected.addUser(username, password).then(function(response){
		if(response){
			res.jsonp({
				success: false,
				message :response
			});
		} else {
			res.jsonp({
				success: false,
				message :'error'
			});
		}
	}, function(err){
		res.jsonp({
			success: false,
			message :'error'
		});
	});

};

exports.checkUserRole = function(req, res, next) {

	var matchingRoles = rolesConfig.mapping[req.url];
	var userId = req.session.userId;
	var roles = req.session.roles;
	// if there are no roles found then its an allowed user

	dbConnected.checkUserRole(userId, roles).then(function(response){
		if(response.allowed){
			next();
		} else {
			res.jsonp({
				success: false,
				message :'error'
			});
		}
	}, function(err){
		res.jsonp({
			success: false,
			message :'error'
		});
	});

};

exports.signIn = function(req, res, next){

	var method = req.method == 'GET' ? 'query': 'body';
    var username = req[method].username;
    var password =req[method].password;
	if(username && password){
        dbConnected.signIn(username, password).then(function(response){
			if(response){
				req.session.userId = response.userId;
				req.session.roles = response.roles.toString();
				next();
			} else {
				res.jsonp({
					success: false,
					message :'error'
				});
			}

		}, function(err){
			res.jsonp({
				success: false,
				message :'error'
			});
		});
    }
};

exports.addUserRole = function(req, res, next){

	var method = req.method == 'GET' ? 'query': 'body';
    var userId = req[method].userId;
    var roleId =req[method].roleId;
	if(userId && roleId){
        dbConnected.addUserRole(userId, roleId).then(function(response){
			if(response){
				req.session.userId = response;
				next();
			} else {
				res.write('error');
			}

		}, function(err){
			res.jsonp({
				success: false,
				message :'error'
			});
		});
    }
};

exports.checkUrlPattern = function(req, res, next) {

	var matchingRoles = rolesConfig.mapping[req.url];
	var roles = req.session.roles;
	var rolesSplit = [];
	if(!roles){
		res.jsonp({
			success: false,
			message :'error'
		});
		return;
	} else {
		if( matchingRoles === roles ){
			res.jsonp({
				success: true,
				message :'sucess'
			});
		} else {
			res.jsonp({
				success: false,
				message :'Not Authorized'
			});
		}
	}

};
