var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    urls = [];

request('http://www.yelp.com/biz/aachi-aappakadai-sunnyvale', function (err, resp, body) {
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        $('li', '.review-highlights-list').each(function () {

            var text = $(this).find('.quote').text();
            console.log(text);
            // if(url.indexOf('i.imgur.com')!=-1){
            //     urls.push(url);
            // }
        });

        // for(var i = 0; i < urls.length; i++){
        //     request(urls[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));
        // }
    }
});