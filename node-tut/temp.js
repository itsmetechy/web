var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var port = 8081;
var host = "127.0.0.1";


var server = http.createServer( function (request, response) {
   var queryData = url.parse(request.url, true).query;
      var aa = JSON.parse(JSON.stringify(queryData));
   response.end(aa.name);

});

server.listen(port, host, function(){
   console.log('Server is now is running at port ' + port+ ' on host '+ host);
});
