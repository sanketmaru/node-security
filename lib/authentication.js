var roles = require('authorize');

function Authenticator() {
    this._key = 'passport';
    this._strategies = {};
    this._serializers = [];
    this._deserializers = [];
    this._infoTransformers = [];
    this._framework = null;
    this._userProperty = 'user';
}

Authenticator.prototype.validate = function() {
	console.log("hello");
};

Authenticator.prototype.checkUserRole = function() {
	authorize.checkUserRole();
};


module.exports = Authenticator;
