//
// bar chart
//

var margin = {top: 10, right: 20, bottom: 20, left: 120},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var y0 = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .2);

var y1 = d3.scale.linear();

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 0);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(12);

var nest = d3.nest()
    .key(function(d) { return d.Group; });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; })
    .x(function(d) { return d.Area; })
    .y(function(d) { return d.Value; })
    .out(function(d, y0) { d.valueOffset = y0; });

// var color = d3.scale.category10();
var color = d3.scale.ordinal()
    .range([/*"#98abc5", "#8a89a6",*/ "#7b6888",/* "#6b486b",*/ "#a05d56", "#d0743c", "#ff8c00"]);

var svg1 = d3.select("#vis1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var tooltip;
var div;
//make tooltip 
div = d3.select("#vis1").append("div")   
    .attr("class", "tooltip_bar")               
    .style("opacity", 0);

d3.csv("csv-files/best_area.csv", function(error, data) {
  data.forEach(function(d) {
    d.Value = +d.Value;
  });

  var dataByGroup = nest.entries(data);

  stack(dataByGroup);
  x.domain(dataByGroup[0].values.map(function(d) { return d.Area; }));
  y0.domain(dataByGroup.map(function(d) { return d.key; }));
  y1.domain([0, d3.max(data, function(d) { return d.Value;
  })]).range([y0.rangeBand(), 0]);

  var group = svg1.selectAll(".group")
      .data(dataByGroup)
    .enter().append("g")
      .attr("class", "group")
      .attr("transform", function(d) { return "translate(0," + y0(d.key) + ")"; });

  group.append("text")
      .attr("class", "group-label")
      .attr("x", -6)
      .attr("y", function(d) { return y1(d.values[0].Value / 2); })
      .attr("dy", "0.35em")
      .text(function(d) { return d.key; })

  group.selectAll("rect")
      .data(function(d) { return d.values; })
    .enter().append("rect")
      .style("fill", function(d) { return color(d.Group); })
      .attr("x", function(d) { return x(d.Area); })
      .attr("y", function(d) { return y1(d.Value); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return y0.rangeBand() - y1(d.Value); })
      .on("mouseover", function(d){
            div.transition()
              .duration(200)
              .style("opacity", .9);

            div.html("<span style='font-weight:bold'>"+d.Group+": "+"<span style='color:green' style='font-weight:bold'>"+d.Value+"</span></br>"+" Area's Danger Scale: </span>"+"<span style='color:red' style='font-weight:bold'>"+d.Scale+"</span>")
              .style("left", (d3.event.pageX) + "px")     
                      .style("top", (d3.event.pageY) + "px"); 
          })
           .on("mouseout", function(d) {       
                  div.transition()        
                      .duration(500)      
                      .style("opacity", 0);  
          });

  group.filter(function(d, i) { return !i; }).append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + y0.rangeBand() + ")")
      .call(xAxis)
      .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "2em")
            .attr("dy", ".45em")
            .attr("transform", function(d) {
                return "rotate(-20)" 
                });

  d3.selectAll("input").on("change", change);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"stacked\"]").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(timeout);
    if (this.value === "multiples") transitionMultiples();
    else transitionStacked();
  }

  function transitionMultiples() {
    var t = svg1.transition().duration(750),
        g = t.selectAll(".group").attr("transform", function(d) { return "translate(0," + y0(d.key) + ")"; });
    
    g.selectAll("rect").attr("y", function(d) { return y1(d.Value); })
          .style("fill", function(d) { 
            return color(d.Group); })
      
    
    g.select(".group-label").attr("y", function(d) { return y1(d.values[0].Value / 2); })
  }

  function transitionStacked() {
    var t = svg1.transition().duration(750),
        g = t.selectAll(".group").attr("transform", "translate(0," + y0(y0.domain()[0]) + ")");

    g.selectAll("rect").attr("y", function(d) { return y1(d.Value + d.valueOffset); })
        .style("fill", function(d) { 
          return "rgb("+ 255*(d.Danger/100)/350+","+ 255*(350-(d.Danger/100))/350+",0)"; })
        
    g.select(".group-label").attr("y", function(d) { return y1(d.values[0].Value / 2 + d.values[0].valueOffset); })
  }
});

//
// Curved text
//

var svg4 = d3.select("#vis2").append("svg")
    .attr("width", 960)
    .attr("height", 200)
    .attr("viewBox", "0 0 1000 300");

svg4.append("defs").append("path")
    .attr("id", "curve")
    .attr("d", "M100,100C200,100 300,0 400,100C500,200 600,200 700,150C800,100 900,100 900,150");

svg4.append("text")
    .attr("id", "curve-text")
  .append("textPath")
    .attr("xlink:href", "#curve")
    .text("Trees are more dangerous than they seem...")
    .transition().duration(2000);

svg4.append("use")
    .attr("id", "curve-line")
    .attr("xlink:href", "#curve");

//
// Pie chart
//

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 3;
  var centered;

var color = d3.scale.ordinal()
    .range([/*"#98abc5", "#8a89a6",*/ "#7b6888",/* "#6b486b",*/ "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);
console.log(labelArc.centroid)
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.Trees; });

var svg2 = d3.select("#vis3").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 // Define the div for the tooltip
 var tip = d3.tip()
      .attr('class', 'd3-tip')
      // .direction('e') 
      .offset([-10,0])
      .html(function(d) {
        return "<strong>Number of Trees:</strong> <span style='color:white'>" + d.data.Trees + "</span></br><strong>Areas:</strong> <span style='color:white'>" + d.data.Areas + "</span>";
      });

  var div2;
// make tooltip 
div2 = d3.select("#vis3").append("div")   
    .attr("class", "tooltip_tree") 
    .style("opacity", 0);

d3.csv("csv-files/dangerous_trees.csv", type, function(error, data) {
  if (error) throw error;
   
  var g2 = svg2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on("mouseover", function(g, i){
        svg2.selectAll(".arc").filter(function(d, ii){
          return ii!=i ;
        })
        .transition(0)
        .style("opacity", 0.05)
      })
      .on("mouseout", function(g, i){
        svg2.selectAll(".arc").filter(function(d, ii){
          return ii!=i;
        })
        .transition(0)
        .style("opacity", 1);
      })
      .on("click", clicked);

  g2.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.Dangerousness); });
g2.call(tip);

  g2.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Dangerousness; })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

function clicked(d){
  var x, y, k;
  if(d && centered !== d){
    var centroid_z = labelArc.centroid(d);
    x = centroid_z[0]+width/4;
    y = centroid_z[1]+height/4;
    k = 2;
    centered = d;
  }else{
    x = width/2;
    y = height/2;
    k = 1;
    centered = null;
  }

  g2.selectAll("path").classed("active", centered && function(d){
    return d === centered;
  });
  g2.transition().duration(750)
  .attr("transform", "translate("+width/2+","+height/2+")scale("+
    k+")translate("+ -x+","+ -y +")")
  .style("stroke", 1.5/k + "px")

// After first click (zoom)
  if (k == 2){
    g2.selectAll("path")
      .on("mouseover", function(d){
            div2.transition()
              .duration(200)
              .style("opacity", .9);
            g2.selectAll("path")
              .transition()
              .duration(500)
              .style("fill", function(d){
                      return "rgb("+ parseInt((255*d.data.Color))+","+ parseInt(255-(255*d.data.Color))+",0)";
                    })
            div2.html("<span style='color:#4d2800'><strong>Types of Trees:</strong></span></br>" + "<span style='color:green'>"+d.data.Types + "</span>")
              .style("left", 0 + "px")     
              .style("top", 2*height + "px"); 
          })
           .on("mouseout", function(d) {       
              div2.transition()        
                  .duration(500)      
                  .style("opacity", 0); 
              g2.selectAll("path")
                .transition()
                .duration(2000)
                .style("fill", function(d) { return color(d.data.Dangerousness); }); 
          })
      }

      // After second click (unzoom)
      if (k == 1){
        g2.selectAll("path")
    .on("mouseover", function(d){
        div2.transition()        
                .duration(500)      
                .style("opacity", 0);
              });
      }
}

});

function type(d) {
  d.Trees = +d.Trees;
  return d;
}

//
// Line graph
//

var margin = {top: 10, right: 20, bottom: 20, left: 120},
    width = 760 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x3 = d3.scale.linear()
    .range([0, width]);

var y3 = d3.scale.linear()
    .range([height, 0]);

var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

var line3 = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x3(d.NumberOfClusters); })
    .y(function(d) { return y3(d.SquaredError); });

var svg3 = d3.select("#vis4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var cluster7;

d3.csv("csv-files/restaurants_squarederrors.csv", type, function(error, data) {
  if (error) throw error;

cluster7 = data[5];

x3.domain([0, d3.max(data, function(d) { return d.NumberOfClusters;})]);
y3.domain([40, d3.max(data, function(d) { return d.SquaredError;})]);

svg3.append("g")
    .attr("class", "x axis3")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis3)
    .append("text")
      .attr("class", "axis3-text")
      .attr("x", width )
      .attr("dy",  "-0.5em")
      .style("text-anchor", "end")
      .text("Number of Clusters");

svg3.append("g")
    .attr("class", "y axis3")
    .call(yAxis3)
    .append("text")
      .attr("class", "axis3-text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Squared Error");

svg3.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line3);

var dashed_hor = svg3.append("line")
    .attr("x1", 0)
    .attr("x2", x3(cluster7.NumberOfClusters))
    .attr("y1", y3(cluster7.SquaredError))
    .attr("y2", y3(cluster7.SquaredError))
    .attr("stroke-width", 2)
    .attr("stroke", "orange")
    .style("stroke-dasharray", ("3,3"))
svg3.append("text")
    .attr("class", "axis3-text")
    .attr("y", y3(cluster7.SquaredError))
    .attr("dy", ".91em")
    .style("text-anchor", "start")
    .style("font-weight", "normal")
    .style("font-family", "sans-serif")
    .text(cluster7.SquaredError);;

var dashed_ver = svg3.append("line")
    .attr("x1", x3(cluster7.NumberOfClusters))
    .attr("x2", x3(cluster7.NumberOfClusters))
    .attr("y1", height)
    .attr("y2", y3(cluster7.SquaredError))
    .attr("stroke-width", 2)
    .attr("stroke", "orange")
    .style("stroke-dasharray", ("3,3"));

svg3.selectAll(".dot")
    .data(data)
  .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function(d){ 
      if (d.NumberOfClusters != 11){
       return x3(d.NumberOfClusters);
     }else{
        return 2000;
     }
      })
    .attr("cy", line3.y())
    .attr("r", 3.5)
    .style("fill", "#DC143C");


var focus = svg3.append("g")
focus.append("circle")
    .attr("cx", x3(cluster7.NumberOfClusters))
    .attr("cy", y3(cluster7.SquaredError))
    .attr("r", 2)
    .style("fill", "#DC143C")
    .each(pulse);

});

function type(d) {
  d.SquaredError = +d.SquaredError;
  d.NumberOfClusters = +d.NumberOfClusters;
  return d;
}

function pulse(focus){
  focus = svg3.select("circle");
      (function repeat() {
        focus = focus
          .attr("cx", x3(cluster7.NumberOfClusters))
          .attr("cy", y3(cluster7.SquaredError))
          .style("fill", "orange")
          .transition()
          .duration(2000)
          .attr("stroke-width", 20)
          .attr("r", 10)
          .transition()
          .duration(2000)
          .attr('stroke-width', 0.5)
          .attr("r", 20)
          .ease('sine')
          .each("end", repeat);
  })();
}

