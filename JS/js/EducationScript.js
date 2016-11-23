//Margin setup
var width = 960,
   height = 500,
   radius = Math.min(width, height) / 2,legendRectSize = 18,legendSpacing = 4;    
//Setup for colours
var color = d3.scale.ordinal()
      .range(["#ff66cc", "#ff9966", "#66ff33", "#6b486b", "#a05d56", "#d0743c", "#ff8c00","red","blue","pink"]);
//Dimensions for arc
var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
var pie = d3.layout.pie()
      .value(function(d) { return d.population; });
//ToolTips
var tooltip = d3.select("body")
   .append("div")
   .style("position", "absolute")
   .style("z-index", "9999")
   .style("visibility", "visible")
   .style("font-size","25pt")
   .style("color","white");

//Appending svg to body
var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//Reading data from json
d3.json("../json/Education.json",function(error, data) {
    if (error) throw error;
    data.forEach(function (d) {
    d.population =+d.population;
    return d;
});


//Appending Group to arc
 var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
      g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.catogories); })
       .on("mouseover", function(d){return tooltip.style("visibility", "visible"),tooltip.text(d.data["population"]);})
      .on("mousemove", function(){return tooltip.style("top",
       (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
     .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


     /* d3.select("#tooltip")
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + "px")
    .style("opacity", 1)
    .select("#value")
    .text(d.value);                      

   */   
//Legend Dimensions
var legend = svg.selectAll('.legend')                     
          .data(color.domain())                                   
          .enter()                                                
          .append('g')                                            
          .attr('class', 'legend')                                
          .attr('transform', function(d, i) {                     
            var height = legendRectSize + legendSpacing;          
            var offset =  height * color.domain().length / 2;     
            var horz = 14 * legendRectSize;                       
            var vert = i * height - offset;                       
            return 'translate(' + horz + ',' + vert + ')';        
          });   

        legend.append('rect')                                     
          .attr('width', legendRectSize)                          
          .attr('height', legendRectSize)                         
          .style('fill', color)                                   
          .style('stroke', color);                                
        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d; }); 
});