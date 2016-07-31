var fs = require(fs);
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = config.port;
var express = require("express");

var app = express.createServer();

app.get("/", function(request, response){
    response.send('Hello!');
});
app.listen(port,host);