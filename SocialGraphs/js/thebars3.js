var margin = {top: 20, right: 30, bottom: 40, left: 100},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

var chartHorBackground = d3.select("#chartHo")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chartHorFill = d3.select("#chartHo")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var tooltip;
// var div;


//
// Sentimental Analysis
//
chartHorFill              
    .append("text")
    .text("Sentimental")
    .attr("x", -97)
    .attr("y", 30)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue");  
  chartHorFill              
    .append("text")
    .text("Analysis")
    .attr("x", -85)
    .attr("y", 50)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue"); 

  chartHorBackground.append("rect")
    .attr("x", 30)
    .attr("y", 10)
    .attr("width", 500)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)"); 

//
// Degree
//
chartHorFill              
    .append("text")
    .text("Amount of")
    .attr("x", -90)
    .attr("y", 130)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue");  
  chartHorFill              
    .append("text")
    .text("Connections")
    .attr("x", -97)
    .attr("y", 150)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue"); 

  chartHorBackground.append("rect")
    .attr("x", 30)
    .attr("y", 110)
    .attr("width", 500)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)"); 

function barData(element){

  d3.selectAll("#chartHo > *").remove();
  console.log(element)

  chartHorBackground = d3.select("#chartHo")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chartHorFill = d3.select("#chartHo")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var div = d3.select("#chartHo").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0);

  //
  // Sentimental Analysis
  //    
  chartHorFill
  .append("rect")
 
    .attr("x", 30)
    .attr("y", 10)
    .attr("width", element.sentiment*10)
    .attr("height", 50)
    .attr("fill", "purple");
  
  chartHorBackground.append("rect")
    .attr("x", 30)
    .attr("y", 10)
    .attr("width", 500)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)")

  


    

  chartHorFill              
    .append("text")
    .text("Sentimental")
    .attr("x", -97)
    .attr("y", 30)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue");  
  chartHorFill              
    .append("text")
    .text("Analysis")
    .attr("x", -85)
    .attr("y", 50)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px");
    

  chartHorBackground              
    .append("text")
    .text(element.sentiment.toFixed(2))
    .attr("x", 450)
    .attr("y", 50)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue")
    .attr("fill","blue")
    // .on("click", 
      // div.transition()
      //     .duration(200)
      //     .style("opacity", .9)
      // div
// .attr("x", d3.event.pageX)
// .attr("y", d3.event.pageY)
    // div.text("Based on tracklist")
    //         .style("opacity",0.9)
    //          .style("left", (d3.event.pageX) + "px")     
    //         .style("top", (d3.event.pageY) + "px")
    //         .style("opacity", .9));
                  // console.log(div.style("top"))
                  // console.log(div.attr("x"))
                  // console.log(div.attr("y"))

    // .on("mouseoout", function(){
    //   div.transition()
    //       .duration(500)
    //       .style("opacity", 0)});

  //
  // Degree
  //    
  chartHorFill.append("rect")
    .attr("x", 30)
    .attr("y", 110)
    .attr("width", element.degree*10)
    .attr("height", 50)
    .attr("fill", "purple");
  
  chartHorBackground.append("rect")
    .attr("x", 30)
    .attr("y", 110)
    .attr("width", 500)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)");   

  chartHorFill              
    .append("text")
    .text("Amount of")
    .attr("x", -90)
    .attr("y", 130)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue");  
  chartHorFill              
    .append("text")
    .text("Connections")
    .attr("x", -97)
    .attr("y", 150)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue"); 

  chartHorBackground              
    .append("text")
    .text(element.degree.toFixed(2))
    .attr("x", 450)
    .attr("y", 150)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","blue");  
}

