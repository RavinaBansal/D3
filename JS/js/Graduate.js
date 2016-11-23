//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
var flag=true;
var header=[];
var json = [];
var rowToCheck=["All ages","Total"];

var readGeneral = readline.createInterface({
input: fs.createReadStream('../csv/General.csv')
});
    //Reading File General
    readGeneral.on('line',function(line){
         compute(line);     
    });
        //Closing General CSV file 
        readGeneral.on("close",function()
        {
          var readSC = readline.createInterface({
        input: fs.createReadStream('../csv/SC.csv')
        });
          //Reading File SC
          readSC.on('line',function(line){
            compute1(line);
            });


             //Closing SC CSV file 
            readSC.on("close",function(){
            var readST = readline.createInterface({
            input: fs.createReadStream('../csv/ST.csv')
            });
              //Reading the file ST
              readST.on('line',function(line){
                compute1(line);
                });

             //Closing SC CSV file 
              readST.on("close",function()
              {
                var finalJson=[];
                for(var population in json)
                {
                    var temp={};
                    temp["AreaName"]=json[population][0];
                    temp["Males"]=json[population][1];
                    temp["Females"]=json[population][2];
                    finalJson.push(temp);
                }
//Output file path
var outPath = path.join(__dirname, '../json/Graduate.json');
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify(finalJson), 'utf8', 
    function(err){console.log(err);});
});
});
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
        if(row[5]==rowToCheck[0] && row[4]==rowToCheck[1])
        {          
          for(let rowIterator = 0; rowIterator < header.length; rowIterator++)
         if(header[rowIterator]=="Area Name")
           tempArray.push(row[rowIterator]);
         else if(header[rowIterator]=="Educational level - Graduate & above - Males") 
            tempArray.push(parseInt(row[rowIterator]));
         else if(header[rowIterator]=="Educational level - Graduate & above - Females") 
            tempArray.push(parseInt(row[rowIterator]));      
            json.push(tempArray);
        }
    }
}

function compute1(line)
{
  var tempArray=[]; 
    row = line.split(",");
    if(row[5]==rowToCheck[0] && row[4]==rowToCheck[1])
    {
        for(let row_iter = 0; row_iter < header.length; row_iter++)
         if(header[row_iter]=="Area Name")
           tempArray.push(row[row_iter]);
         else if(header[row_iter]=="Educational level - Graduate & above - Males") 
            tempArray.push(parseInt(row[row_iter]));
         else if(header[row_iter]=="Educational level - Graduate & above - Females") 
            tempArray.push(parseInt(row[row_iter]));      
    // Add object to list 
   
        if(json.length!=0)
        {
            let check=0;
            let index=-1;
            for(let j=0;j<json.length;j++)
            {
                if(json[j].includes(tempArray[0])==true)
                { 
                    check=1;
                    index=j;
                    break;
                }
            }
            if(check==1)
                json[index][1]=json[index][1]+tempArray[1];
            else
              json.push(tempArray);  
        }
        else
        json.push(tempArray);
}
}