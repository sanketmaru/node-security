var roles = require('./authorize');

function Authenticator() {
    this._key = 'passport';
    this._strategies = {};
    this._serializers = [];
    this._deserializers = [];
    this._infoTransformers = [];
    this._framework = null;
    this._userProperty = 'user';
}

Authenticator.prototype.validate = function(req,res,next) {
    var method = req.method == 'GET' ? 'query': 'body';
    var username = req[method].username;
    var password =req[method].password;
	if(username && password){
        var userId = roles.validate(username,password);
        if(userId) {
            req.session.userId = userId;
            next();
        } else {
            res.send('error')
        }
    }
    res.send('error')
};

Authenticator.prototype.checkUserRole = function(req,res,next) {
    roles.checkUserRole(req, res, next);
};


module.exports = Authenticator;
