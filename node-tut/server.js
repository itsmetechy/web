var http = require('http');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync("./files/config.json"));
console.log('Starting');
var host = config.host;
var port = config.port;

var server = http.createServer( function(request, response ){
    console.log("Received request: "+ request.url);
    
    fs.readFile("./"+request.url, function(error, data){
        if(error){
            response.writeHead(404, {"Content-type":"text/plain"});
            response.end("Sorry the page was not found");
        }else{
            response.writeHead(200, {"Content-type":"text/plain"});
            response.end(data);
        }
        
    });
});




fs.watchFile("./files/config.json", function(cur, prev){
    console.log('File changed');
    config = JSON.parse(fs.readFileSync("./files/config.json"));
    
    console.log(config);
});



server.listen(port, host, function(){
   console.log("Listening " + host + " "  + port); 
});
