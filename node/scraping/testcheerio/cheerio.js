var request = require('request'),
    cheerio = require('cheerio');


//$ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');
var $ = cheerio.load('index.html');
    $('li', 'ul').each(function () {
        console.log(this).text();
    });
console.log($('.orange', '#fruits').text());

// request('index.html', function (err, res, body) {
//     var $ = cheerio.load(body);
// console.log(body);
//     $('li', 'ul').each(function () {
//         console.log(this).text();
//     });
//     //console.log($('.orange', '#fruits').text());
// });





