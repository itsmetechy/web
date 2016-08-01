var fs = require('fs');
var config = JSON.parse(fs.readFileSync("./files/config.json"));
console.log('Starting');
var host = config.host;
var port = config.port;
var express = require('express');

var app = express();
app.use(express.static(__dirname + "/"));
//app.use(app.router);
app.get("/", function(request, response){
    response.send('Helloo');
});

app.get("/hello/:text", function(request, response){
    response.send('Hello two');
});

app.listen(port, host);

