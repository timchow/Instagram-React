var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path    = require("path");
var http = require('http');
var pug = require('pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
    var html = pug.renderFile(__dirname + '/index.pug');

    res.send(html);
});

server.listen(8000);

console.log('Server running at http://127.0.0.1:8000/');