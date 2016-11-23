//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
var flag=true;
var header=[];
var json = [];
var initial,terminate;
var rowToCheck=["All ages","Total"];

var readFinal = readline.createInterface({
input: fs.createReadStream('../csv/final.csv')
});
//Reading the file line by line
readFinal.on('line',function(line){
     compute(line);     
});
//Closing CSV file 
readFinal.on("close",function()
{
    var finalJson=[];
    var x=initial;
    for(let iter=0;iter<json[0].length;iter++)
    {
        var temp={};
        temp["catogories"]=header[x].substring(20,header[x].length);
        temp["population"]=json[0][iter];
         finalJson.push(temp);
         x+=3;
    }
    //Output file path
    var outPath = path.join(__dirname, '../json/Education.json');
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(finalJson), 'utf8', 
        function(err){console.log(err);});
});

function compute(line)
{
    if(flag)
     {
       header=line.split(",");
       flag=false;
     }
     else
     {
        var tempArray=[]; 
        var row = line.split(",");
         for(var iter = 0; iter < header.length; iter++)
            if(header[iter]=="Educational level - Literate without educational level - Persons")
                initial=iter;
         else if(header[iter]=="Educational level - Unclassified - Persons") 
                terminate=iter;

        if(row[5]==rowToCheck[0] && row[4]==rowToCheck[1])
        {
            for(let rowIterator = initial; rowIterator <= terminate; rowIterator+=3)
               tempArray.push(parseInt(row[rowIterator]));
        // Add objects to list 
            if(json.length!=0)
                for(let j=0;j<tempArray.length;j++)
                    {
                       json[0][j]=json[0][j]+tempArray[j];
                }
            else
            json.push(tempArray);
        }
      }
  }