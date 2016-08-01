var http = require('http');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./files/config.json'));
var port = config.port;
var host = config.host;


var server = http.createServer(function (request, response) {

    console.log(request.url);
    fs.readFile('home.html', function (error, data) {
        if (error) {
            response.writeHead(404, {
                'Content-type': 'text/plain'
            });
            response.end('Something went wrong');
        } else {
            response.writeHead(200, {
                'Content-type': 'text/plain'
            });
            response.end(data);
        }
    });

});

server.listen(port, host, function () {
    console.log("Listening " + host + ":" + port);
});

fs.watchFile('./files/config.json', function () {
    config = JSON.parse(fs.readFileSync('./files/config.json'));
    port = config.port;
    host = config.host;
    server.close();
    server.listen(port, host, function () {
        console.log("Now Listening " + host + ":" + port);
    });
});