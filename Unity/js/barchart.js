function showbars(pltext){
    console.log(pltext)
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
    // width = 960 - margin.left - margin.right,
    width = 250
    height = 200 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var chart = d3.select("#secondcol").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data/bardata.tsv", type, function(error, data) {
       
        console.log(data[0])
        console.log(data[0].Category)
        console.log(data[0]['PLATFORM_ANDROID'])

      x.domain(data.map(function(d,i) { return data[i].Category; }));
      y.domain([0, d3.max(data, function(d,i) { return data[i]['PLATFORM_ANDROID']; })]);

      chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      chart.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d,i) { return x(data[i].Category); })
          .attr("y", function(d,i) { return y(data[i]['PLATFORM_ANDROID']); })
          .attr("height", function(d,i) { return height - y(data[i]['PLATFORM_ANDROID']); })
          .attr("width", x.rangeBand());
    });

function type(d,i) {
  data[i]['PLATFORM_ANDROID'] = +data[i]['PLATFORM_ANDROID']; // coerce to number
  return d;
}

        // var dataset1 = [5,10,15,20,25];
        //     // Width and height of canvas
        //     var w1 = 600;
        //     var h1 = 200;
        //     var chart2A;
        //     var padding1 = 1;
        //     // Create svg element
        //     chart2A = d3.select("#secondcol")
        //         .append("svg")
        //         .attr("class", "svgbar")
        //         .attr("width", w1)
        //         .attr("height", h1);

        //     chart2A.selectAll("rect")
        //         .data(dataset1)
        //         .enter()
        //         .append("rect")
        //         .attr("x",function(d,i){
        //             return 50*i+padding1;
        //         })
        //         .attr("y",function(d,i){
        //             return 60-i*15;
        //         })
        //         .attr("width", 80)
        //         .attr("height", 80)
        //         .attr("fill", function(d,i){
        //             switch(i){
        //                 case 0:
        //                     return "purple"
        //                 case 1:
        //                     return "blue"
        //                 case 2:
        //                     return "green"
        //                 case 3:
        //                     return "yellow"
        //                 case 4:
        //                     return "red"
        //             }   
        //         })
        //         .attr("stroke", "gray")
        //         .attr("stroke-width", 2)
        //         .attr("opacity", function(d,i){ 
        //             return 1.0-0.2*i;
        //         });

}