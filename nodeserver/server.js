var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = new express();
var request = require('request');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });*/

app.post('/api/token/:code', function(req, res) {

    console.log(req);
    //call github api for token
    request.post({
        uri: 'https://github.com/login/oauth/access_token',
        form: {
            client_id:      'f63ef0cba4f0757d893e',
            client_secret:  '6837362f8fbe5ab444837a20e1599e4d62cef5c1',
            code:           req.params.code
        },
        json: true
    }, function(err, httpResponse, body) {
        console.log(httpResponse);

        if (err) {
            res.send(500, { error: err });
            return;
        }
        res.send(body);
    });
});

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});