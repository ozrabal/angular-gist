var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = new express();
var request = require('request');
var config = require( "../app.config.json" ); //include configs

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/api/token/:code', function(req, res) {

    console.log(req);
    //call github api for token
    request.post({
        uri: config.API.GITHUB_OAUTH_TOKEN_URL,
        form: {
            client_id:      config.API.CLIENT_ID,
            client_secret:  config.API.GITHUB_CLIENT_SECRET,
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