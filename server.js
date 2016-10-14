var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path    = require("path");
var http = require('http');
var pug = require('pug');

app.get('/', function(req, res, next) {
    var html = pug.renderFile(__dirname + '/index.pug');
    res.send(html);
});

server.listen(8000);

console.log('Server running at http://127.0.0.1:8000/');