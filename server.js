var express = require('express'),
 p = require('passport'),
newMod = require('./lib');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.get('/login', newMod.validate,function(req, res) {
    res.redirect('/radical')
});

app.get('/radical',newMod.checkUserRole, function(req, res) {
    if(req.session.userId) {
        res.send('Last page was: ' + req.session.lastPage + '. ');
    } else {
    }
});
app.get('/tubular', function(req, res) {
    res.send('Are you a surfer?');
});
//If you host the application on Modulus the PORT environment variable will be defined,
//otherwise I’m simply using 8080.
app.listen(process.env.PORT || 9001);



