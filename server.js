var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path    = require("path");
var https = require('https');
var pug = require('pug');

var ACCESS_TOKEN = "48202095.e029fea.7e080ab5cc0a4ae6b8094adf05a5e980";

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function(req, res, next) {
	var html = pug.renderFile(__dirname + '/index.pug'); 
	res.send(html);
});

// Creating own Instagram wrapper for user info
// Couldn't bypass the cross domain origin issue - this is the alternative
app.get('/userInfo', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');		
	var response = res;
	var user = req.query.user;
	var reqUrl = "https://www.instagram.com/"+user+"/?__a=1";
	var body = "";

	https.get(reqUrl, function(res) {
		res.on('data', function (data) {
			body += data;
		});
		res.on('end', function(){
			response.send(body);
		})
	});
});

app.get('/media', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	var response = res;
	var user = req.query.userId;
	var reqUrl = "https://api.instagram.com/v1/users/"+user+"/media/recent/?access_token="+ACCESS_TOKEN;
	var body = "";
	https.get(reqUrl, function(res) {
		res.on('data', function (data) {
			body += data;
		});
		res.on('end', function(){
			response.send(body);
		})
	});
});




server.listen(8000);

console.log('Server running at http://127.0.0.1:8000/');