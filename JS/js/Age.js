//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
var flag=true;
var rowToCheck=["Total"];
var jsonArray = [];
var header=[];

var read = readline.createInterface({
  input: fs.createReadStream('../csv/final.csv')
});

//Reading the file line by line
read.on('line',function(line){
  compute(line);
});

read.on("close",function()
{
	jsonArray.shift();
  var finalJson=[];
  for(var age in jsonArray)
  {
    var temp={};
    temp["AgeGroup"]=jsonArray[age][0];
    temp["LiteratePerson"]=jsonArray[age][1];
    finalJson.push(temp);
  }

//Output file path
var outPath = path.join(__dirname, '../json/Age.json');
// Convert object to string, write jsonArray to file
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
        if(row[4]==rowToCheck[0])
        {
          for(let rowIterator = 0; rowIterator < header.length; rowIterator++)

              if(header[rowIterator]=="Age-group")
                tempArray.push(row[rowIterator]);
              else if(header[rowIterator]=="Literate - Persons") 
                tempArray.push(parseInt(row[rowIterator]));
                
              // Add objects to list 
              if(jsonArray.length!=0)
              {
                let check=0;
                let index=-1;
                  for(let j=0;j<jsonArray.length;j++)
                  {
                    if(jsonArray[j].includes(tempArray[0])==true)
                      { 
                        check=1;
                        index=j;
                        break;
                      }
                  } 
                  
                  if(check==1){
                    jsonArray[index][1]=jsonArray[index][1]+tempArray[1];
                  }  
                  else
                    jsonArray.push(tempArray);  
              }
              else
                jsonArray.push(tempArray);

        }
    }
}