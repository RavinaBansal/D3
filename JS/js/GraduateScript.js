//Margin Setup
var margin={top:70, bottom:165, left:150, right:50},
   width = 1560 - margin.left - margin.right,
   height = 600 - margin.top - margin.bottom;
//Scale for x and y axis
var x = d3.scale.ordinal()
   .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
   .rangeRound([height, 0]);
//Colour scale
var color = d3.scale.category20();
var xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom");
var yAxis = d3.svg.axis()
   .scale(y)
   .orient("left");


//Appending svg to body
var svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom+150)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Reading from json File
 d3.json("../json/Graduate.json",  function( data) {
 color.domain(d3.keys(data[0]).filter(function(key) { return key !== "AreaName"; }));
 data.forEach(function(d) {
   var y0 = 0;
   d.Population = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
   d.total = d.Population[d.Population.length - 1].y1;
 });

//Sorting the data objects
 data.sort(function(a, b) { return b.total - a.total; });
 x.domain(data.map(function(d) { return d.AreaName; }));
 y.domain([0, d3.max(data, function(d) { return d.total; })]);
 
 //Appending Group for x-axis
 svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .selectAll("text")
     .attr("y", 0)
     .attr("x" ,9)
      .attr("transform", "rotate(65)")
     .style("text-anchor", "start"); 
//Appending Group for y-axis   
 svg.append("g")
     .attr("class", "y axis")
     .call(yAxis)
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "-8em")
     .attr("dx", "-8em")
     .style("text-anchor", "end")
     .text("Population");
 var state = svg.selectAll(".AreaName")
     .data(data)
   .enter().append("g")
     .attr("class", "g")
     .attr("transform", function(d) { return "translate(" + x(d.AreaName) + ",0)"; });
 state.selectAll("rect")
     .data(function(d) { return d.Population; })
   .enter().append("rect")
     .attr("width", x.rangeBand())
     .attr("y", function(d) { return y(d.y1); })
     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
     .style("fill", function(d) { return color(d.name); })
     .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y1);
  });

//Legend Dimensions
 var legend = svg.selectAll(".legend")
     .data(color.domain().slice().reverse())
   .enter().append("g")
     .attr("class", "legend")
     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
 legend.append("rect")
         .attr("x", width - 18)
         .attr("width", 18)
         .attr("height", 18)
     .style("fill", color);
 legend.append("text")
         .attr("x", width - 24)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .style("fill","green")
         .style("font-size","20px")
          .text(function(d) { return d; });
//ToolTip  
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 70)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
   });