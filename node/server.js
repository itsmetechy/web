var http = require('http');

//404 shandle
function send404Response(response){
    response.writeHead(404, {"Context-type":"text/plain"});
    response.write('404 page');
    response.end();
}


function onRequest(request, response){
    
    if(request == 'GET' && request.url == '/'){
        response.writeHead(200, {"Context-type":"text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }
}

http.createServer(onRequest).listen(8888);
//console.log('Server is now running');