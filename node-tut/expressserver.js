var fs = require('fs');
var http = require('http');
var config = JSON.parse(fs.readFileSync("./files/config.json"));
console.log('Starting');
var host = config.host;
var port = config.port;
var express = require('express');

var app = express();
//var server = http.createServer(app);

app.get("/", function (req, res) {
    res.send("Hello");
});

console.log(port, host);