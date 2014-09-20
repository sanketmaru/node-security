if(typeof rolesConfig == 'undefined' || typeof DBConfig == 'undefined' ) {
    throw new Error('create db and roles configurations files');
} else {
    var mod = require('./authentication');
    exports = module.exports = new mod();
    exports.nodeSecurity = new mod();
}
