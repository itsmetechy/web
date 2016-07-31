var fs = require("fs");
var zlib = require('zlib');

// Decompress the file input.txt.gz to input.txt
fs.createReadStream('testzip.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('testzip.txt'));

console.log("File Decompressed.");