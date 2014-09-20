var express = require('express'),
 p = require('passport'),
newMod = require('./lib');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.get('/login', function(req, res) {
    console.log(JSON.stringify(newMod));
	newMod.validate();
	console.log(newMod);
    if(req.session.lastPage) {
        res.send('Last page was: ' + req.session.lastPage + '. ');
        req.session.lastPage = '/awesome';
    } else {
        res.send('Your Awesome. ');
        req.session.lastPage = '/awesome';
    }

});

app.get('/radical', function(req, res) {
    if(req.session.lastPage) {
        res.send('Last page was: ' + req.session.lastPage + '. ');
    } else {
        res.setHeader('Basic realm="Retry left 5 times"');
        console.log('login failed. wrong username or password.');
        res.send(401);
    }
});
app.get('/tubular', function(req, res) {
    res.send('Are you a surfer?');
});
//If you host the application on Modulus the PORT environment variable will be defined,
//otherwise I’m simply using 8080.
app.listen(process.env.PORT || 9001);



