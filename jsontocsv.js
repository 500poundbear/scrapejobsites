var name = "output1201to1491"

var json2csv = require('json2csv');
var fs = require('fs');
var fields = [
'Url',
'Title',
'Company Name',
'Reference No.' ,
'Application Deadline' ,
'City',
'Job Location',
'Contract Type',
'Job Category',
'Salary',
'Industry',
'Company Type',
'No. of Employees',
'Career Level',
'Degree',
'Experience',
'Professional Skill',
'Language Skill',
'Descriptions'];


var input = name + ".json";
var output = name + ".csv";

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(input, 'utf8'));

var myData = obj;
var csv = json2csv({ data: myData, fields: fields });

fs.writeFile(output, csv, function(err) {
  if (err) throw err;
  console.log('file saved ' + output);
});
