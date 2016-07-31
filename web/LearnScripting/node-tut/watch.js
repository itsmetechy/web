//Watch file change
//-----------------------------------------------------------------


//var fs = require('fs');
//console.log('Started..');
//
//var config = JSON.parse(fs.readFileSync('./files/config.json'));
//console.log("Current Port "+ config.port);
//
//fs.watchFile('./files/config.json', function (curr, prev) {
//    console.log('Files changes saved');
//    config = JSON.parse(fs.readFileSync('./files/config.json'));
//    var changedPort = config.port;
//    console.log("Changed Port "+ changedPort);
//    //document.getElementById('demo').innerHTML = changedPort;
//});