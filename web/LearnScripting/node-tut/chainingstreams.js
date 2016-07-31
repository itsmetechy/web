var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('testzip.txt.gz')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('testzip.txt.gz'));

console.log("File Compressed.");