var
  _ = require("underscore"),
  fs = require("fs"),
 roles = require('/config/security/roles');
 authentication = require('/config/security/authentication');


var config_dir = "./config";
var db = process.env.DB;

var file_names = [];
file_names.push("roles");
if(user) file_names.push(user+'schema');

// Convert file names to proper format
file_names = _(file_names).map(function(it) { return it.toLowerCase() + ".js"; });
