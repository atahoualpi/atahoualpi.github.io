function showbars(pltext, arccolor){
    console.log(arccolor)
	var margin = {top: 20, right: 30, bottom: 30, left: 50},
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
        .tickValues([0,20000, 40000,60000,80000, 100000])
        .orient("left");

    var chart = d3.select("#secondcol").append("svg")
        .attr("class", "barcharts")
        .attr("id", function(){ return pltext})
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xSymbol = chart.append("svg:image")
        .attr("xlink:href", "pictures/xsymb.png")
        .attr("x", "235")
        .attr("y", "-20")
        .attr("width", "70")
        .attr("height", "16")
        .on("click", function(){
            isClicked[pltext] = 0;
            var index = arr.indexOf(pltext);
            if (index > -1) {
                arr.splice(index, 1);
            }
            removebars(pltext);
            removepics(pltext);
            removeanim(pltext);
        })

    var valArray = [];

    d3.tsv("data/bardata.tsv", type, function(error, data) {
        for (var i=0;i<4;i++){
            valArray.push(parseInt(data[i][pltext]))
        }

        var maxheight = Math.max(...valArray);

      x.domain(data.map(function(d,i) { return data[i].Category; }));
      y.domain([0, 100000]);

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
          .attr("y", function(d,i) { 
            return y(data[i][pltext]); })
          .attr("height", function(d,i) { return height - y(data[i][pltext]); })
          .attr("width", x.rangeBand())
          .attr("fill", arccolor[pltext]);

    chart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 4))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(pltext);
    });

    function type(d,i) {
      data[i][pltext] = +data[i][pltext]; // coerce to number
      return d;
    }

}

function removebars(pltext){
    d3.select("#" + pltext).remove();
}

function resetall(){
    arr = [];
    d3.selectAll(".barcharts").remove();
    d3.selectAll(".svgimg").remove();
    d3.selectAll("g.arc").select("path").transition()
        .duration(750)
              // .attr("stroke","blue")
              .attr("stroke-width", 0)
              .attr("d", arcFinal);
}