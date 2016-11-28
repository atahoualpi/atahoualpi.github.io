var margin = {top: 20, right: 30, bottom: 40, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var padding2 = 30;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .tickSize(0)
//     .tickPadding(6);

// var svg = d3.select("body").append("svg")
var chartHor = d3.select("#chartHo")

    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/data.tsv", type, function(error, data) {
  x.domain(d3.extent(data, function(d) { return d.value; })).nice();
  y.domain(data.map(function(d) { return d.name; }));

  var yScale1 = d3.scale.linear()
                    .domain([0, d3.max(data, function(d,i){return i*100})])
                    .range([height-padding2, padding2]);

  chartHor.selectAll("rect")
      .data(data)
      .enter().append("rect")
      // .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand())
      // .attr("fill", function(d){ return "rgb(0,"+(d.value*1000)+",0)"; });
           .attr("fill", "red");
 

 chartHor.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(function(d){return d.value})
                    .attr("x", 0)
                    .attr("y", function(d,i){ return 10+i*80})
                    // .attr("y", function(d,i){
                    //     return yScale1(d.value*1000)})
                    .attr("font-family", 'FontAwesome')
                    .attr("font-size", "11px")
                    .attr("fill", function(d, i){
                            return "rgb("+(178-i*10)+","+(128+i)+","+(78+i*10)+")"
                    }); 
  // chartHor.append("g")
  //      .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //      .call(xAxis);

  // chartHor.append("g")
  //      .attr("class", "y axis")
  //     .attr("transform", "translate(" + x(0) + ",0)")
  //     .call(yAxis);
});

function type(d) {
  d.value = +d.value;
  return d;
}