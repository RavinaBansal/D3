var fs = require('fs');

var writeStream = fs.createWriteStream('../csv/final.csv',{'flags':'a'});

var lineReader = require('readline').createInterface({
input: require('fs').createReadStream('../csv/General.csv')
});

lineReader.on('line', function (line) //reads line by line
{
writeStream.write(line + "\n"); //write line to the file
});

var lineReader1 = require('readline').createInterface({
input: require('fs').createReadStream('../csv/SC.csv')
});

lineReader1.on('line', function (line) //reads line by line
{
writeStream.write(line + "\n"); //write line to the file
});

var lineReader2 = require('readline').createInterface({
input: require('fs').createReadStream('../csv/ST.csv')
});

lineReader2.on('line', function (line) //reads line by line
{
writeStream.write(line + "\n"); //write line to the file
});