//Write file Async
//------------------------------------------------------------

//var fs = require("fs");
//var message = "UI Lessons launched successfully";
//
//console.log("Starting");
//fs.writeFile("./files/write_sync.txt", message, (function()){
//    console.log('It\'s saved!');
//});
//console.log("Finished");



//Write file Sync
//----------------------------------------------------
var fs = require("fs");
var message = "UI Lessons launched successfully, wil do";

console.log("Starting");
fs.writeFile("./files/write_sync.txt", message);
console.log("Finished");