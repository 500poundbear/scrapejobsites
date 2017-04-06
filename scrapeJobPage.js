var fetch = require('fetch').fetchUrl;
var cheerio = require('cheerio');

// For file
var fs = require('fs');
var lineReader = require('readline');

// Base url of site
var base = "";
// Relative paths to scrape
var pages = [];
// Specify which urls to scrape
var START = 1201;
var END = 1490;

var entriesLength = pages.length;

// Results
var results = [];

startScrape(pages[START], START);

function startScrape(url, ind) {
    console.log((ind + 1)+") Fetching " + url);
    var turl = base + url;
    fetch(turl, function(err, meta, body) {
        var $ = cheerio.load(body);

        var missingText = "[MISSING]";

        var getTitle = $('div#job-header div.row div.col-xs-12 h3');
        var title = missingText;
        try {
             title = getTitle['0'].children[0].data;
        }catch(error){}

        var getCompany = $('div#job-header div.row div.col-xs-12 h4 a ');
        var companyName = missingText;
        try {
            companyName = getCompany[0].children[0].data;
        }catch(error){}
        //var title = getHeader['0'].children[0].data;


        var getReferenceNumber = $('div#job-header div.row div.col-xs-12 p strong')

        var reference = missingText;
        var applicationDeadline = missingText;

        try {
             reference = getReferenceNumber[0].children[0].data;
        }catch(error){}
        try {
             applicationDeadline = getReferenceNumber[1].children[0].data;
        }catch(error){}
        var getBoxes = $('.col-md-6.col-xs-12');

        var jobDetails = getBoxes[0];
        var companyDetails = getBoxes[1];
        var preferredCandidate = getBoxes[2];
        var skills = getBoxes[3];

        var city = missingText;
        var location = missingText;
        var type = missingText;
        var category = missingText;
        var salary = missingText;

        try {
            city = jobDetails.children[7].children[3].children[0].data;
        }catch(error){}
        try {
             location = jobDetails.children[7].children[7].children[0].data;
        }catch(error){}
        try {
             type = jobDetails.children[7].children[11].children[0].data;
        }catch(error){}
        try {
             category = jobDetails.children[7].children[15].children[0].data;
        }catch(error){}
        try {
             salary = jobDetails.children[7].children[19].children[0].data;
        }catch(error){}

        var industry = missingText;
        var type = missingText;
        var employees = missingText;

        try {
             industry = companyDetails.children[7].children[3].children[0].data;
        }catch(error){}
        try {
             type = companyDetails.children[7].children[7].children[0].data;
        }catch(error){}
        try {
             employees = companyDetails.children[7].children[11].children[0].data;
        }catch(error){}

        var careerlevel = missingText;
        var degree = missingText;
        var experience = missingText;

        try {
             careerlevel = preferredCandidate.children[7].children[3].children[0].data;
        }catch(error){}
        try {
             degree = preferredCandidate.children[7].children[7].children[0].data;
        }catch(error){}
        try {
             experience = preferredCandidate.children[7].children[11].children[0].data;
        }catch(error){}

        var professionalskill = missingText;
        var languageskill = missingText;

        try {
             professionalskill = (skills.children[1].children[3].children[4].data);
        }catch(error){}
        try {
             languageskill = (skills.children[3].children[3].children[4].data);
        }catch(error){}

        var getdescriptions = missingText;

        try {
            getdescriptions = $.html('div.col-xs-12.job-details-section div.row div.col-xs-12 div.dl-horizontal');
        }catch(error){}


        var pageResult = {
            'Url': turl,
            'Title': title,
            'Company Name': companyName,
            'Reference No.' : reference,
            'Application Deadline' : applicationDeadline,
            'City': city,
            'Job Location': location,
            'Contract Type': type,
            'Job Category': category,
            'Salary': salary,
            'Industry': industry,
            'Company Type': type,
            'No. of Employees': employees,
            'Career Level': careerlevel,
            'Degree': degree,
            'Experience': experience,
            'Professional Skill': professionalskill,
            'Language Skill': languageskill,
            'Descriptions' : getdescriptions
        };
        results.push(pageResult);
        if(ind === END) {
            fs.appendFile('output.json', JSON.stringify(results), function(err) {
                if (err) throw err;
                console.log("Written " + ind + " entries");
            });
        } else {
            startScrape(pages[ind + 1], ind + 1);
        }
    });
}
