var margin = {top: 20, right: 30, bottom: 40, left: 100},
      // width = 960 - margin.left - margin.right,
      // height = 500 - margin.top - margin.bottom;
      width = 700,
      height = 500;



var chartHorBackground = d3.select("#chartHo").select("svg")
if(chartHorBackground.empty()){
  chartHorBackground = d3.select("#chartHo").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }

  var g1 = chartHorBackground.append("g")

        g1.append("rect")
            .attr("class", "back_rect")
            .attr("x", -margin.left)
            .attr("y", -margin.top)
            .attr("width", width)
            .attr("height", height)

var chartHorFill = d3.select("#chartHo").select("svg")
if(chartHorFill.empty()){
  chartHorFill = d3.select("#chartHo").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}


// var tooltip;
// var div;


//
// Sentimental Analysis
//

 chartHorBackground.append("rect")
    .attr("x", 70)
    .attr("y", 0)
    .attr("width", 300)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)"); 

chartHorFill
    .append("rect")
    .attr("class", "fil1")
    .attr("x", 70)
    .attr("y", 0)
    .attr("width", 0)
    .attr("height", 50)
    .attr("fill", "purple");

 

  chartHorBackground              
    .append("text")
    .attr("class", "sent")
    .text("")
    .attr("x", 270)
    .attr("y", 35)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","purple")

  chartHorFill              
    .append("text")
    .text("Sentimental")
    .attr("x", -80)
    .attr("y", 25)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("fill","black");  
  chartHorFill              
    .append("text")
    .text("Analysis")
    .attr("x", -60)
    .attr("y", 45)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("fill","black"); 

//
// Degree
//

chartHorBackground.append("rect")
    .attr("x", 70)
    .attr("y", 100)
    .attr("width", 300)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)");  

  chartHorFill.append("rect")
    .attr("class", "fil2")
    .attr("x", 70)
    .attr("y", 100)
    .attr("width", 0)
    .attr("height", 50)
    .attr("fill", "purple"); 

  
  chartHorBackground              
    .append("text")
    .attr("class", "deg")
    .text("")
    .attr("x", 270)
    .attr("y", 135)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","purple"); 

  chartHorFill              
    .append("text")
    .text("Number of")
    .attr("x", -70)
    .attr("y", 120)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("fill","black");  
  chartHorFill              
    .append("text")
    .text("Connections")
    .attr("x", -80)
    .attr("y", 140)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("fill","black"); 

function barData(element){

  // chartHorBackground = d3.select("#chartHo")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // chartHorFill = d3.select("#chartHo")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // var div = d3.select("#chartHo").append("div")   
  //     .attr("class", "tooltip")               
  //     .style("opacity", 0);

  //
  // Sentimental Analysis
  //    
  chartHorFill
    .select("rect.fil1") 
    .transition()
    .duration(200)
    .attr("width", element.sentiment*10)   

  chartHorBackground              
    .select("text.sent")
    .transition()
    .duration(200)
    .text(element.sentiment.toFixed(2))
    .attr("fill", function(){
      if(element.sentiment>20)
        return "rgb(255,195,255)"
      else
        return "purple"
    })

  
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
  chartHorFill
    .select("rect.fil2")
    .transition()
    .duration(200)
    .attr("width", element.degree*10)
     

  chartHorBackground              
    .select("text.deg")
    .transition()
    .duration(200)
    .text(element.degree.toFixed(2))
    .attr("fill", function(){
      if(element.degree>20)
        return "rgb(255,195,255)"
      else
        return "purple"
    })
    
}