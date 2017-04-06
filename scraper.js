var fetch = require('fetch').fetchUrl;
var cheerio = require('cheerio');

// For file
var fs = require('fs');
var lineReader = require('readline');

var url = ""; // Insert URL to scrape here

// Results
var results = [];
startScrape(url, 1);
function startScrape(url, page) {
    var turl = url + page;
    fetch(turl, function(err, meta, body) {
        var $ = cheerio.load(body);

        var getUnicode = $('.btn.btn-info.btn-block.icon-eye');

        getUnicode.each(function(i, line) {
            var jobPage = line.attribs.href;
            results.push(jobPage);
        });

        if (page < 75) {
            startScrape (url, page + 1);
        } else {
            fs.appendFile('output.json', JSON.stringify(results), function(err) {
                if (err) throw err;
                console.log("Written from 1 to 75");
            });
        }
    });
}
