var crypto = require('crypto');
var db     = require('../config/db');

exports.hashPassword = function(password) {
	try {
		var body = {
			password: password
		};
		var hash = crypto.createHash('sha512');
		hash.update(JSON.stringify(body));
		return hash.digest('hex');
	} catch(e) {
		return false;
	}
};

exports.generateHash = function(username) {
	try {
		var epoch = new Date().getTime();
		var cipher = crypto.createCipher('AES256', db.privateAESKeyHash);
		var cy = cipher.update('{\"user\":\"' + username + '}', 'utf8', 'hex');
		encrypted = cy += cipher.final('hex');
	} catch (err) {
		return 'error';
	}
	return encrypted;
};

