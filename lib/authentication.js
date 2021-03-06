var authorize = require('./authorize');

function Authenticator() {
    this._key = 'security';
}

Authenticator.prototype.signUp = function(req,res,next) {
    authorize.signUp(req, res, next);
};


Authenticator.prototype.signIn = function(req,res,next) {
    authorize.signIn(req, res, next);
};

Authenticator.prototype.checkUserRole = function(req,res,next) {
    authorize.checkUserRole(req, res, next);
};

Authenticator.prototype.checkUrlPattern = function(req,res,next) {
    authorize.checkUrlPattern(req, res, next);
};

Authenticator.prototype.addUserRole = function(req,res,next) {
    authorize.addUserRole(req, res, next);
};

module.exports = Authenticator;
