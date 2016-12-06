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

//
// Sentimental Analysis
//

 chartHorBackground.append("rect")
    .attr("x", -80)
    .attr("y", 50)
    .attr("width", 400)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)"); 

chartHorFill
    .append("rect")
    .attr("class", "fil1")
    .attr("x", -80)
    .attr("y", 50)
    .attr("width", 0)
    .attr("height", 50)
    .attr("fill", "purple");

 

  chartHorBackground              
    .append("text")
    .attr("class", "sent")
    .text("")
    .attr("x", 250)
    .attr("y", 85)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","purple")

  chartHorFill              
    .append("text")
    .text("Sentimental Analysis")
    .attr("x", -80)
    .attr("y", 25)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","black")
    .attr("stroke", "green")
        .attr("stroke-width", "0.8px");  
  // chartHorFill              
  //   .append("text")
  //   .text("Analysis")
  //   .attr("x", -60)
  //   .attr("y", 45)
  //   .attr("font-family", 'FontAwesome')
  //   .attr("font-size", "20px")
  //   .attr("font-weight", "bold")
  //   .attr("fill","black"); 

//
// Degree
//

chartHorBackground.append("rect")
    .attr("x", -80)
    .attr("y", 200)
    .attr("width", 400)
    .attr("height", 50)
    .attr("opacity", 0.6)
    .attr("fill", "rgb(255,195,255)");  

  chartHorFill.append("rect")
    .attr("class", "fil2")
    .attr("x", -80)
    .attr("y", 200)
    .attr("width", 0)
    .attr("height", 50)
    .attr("fill", "purple"); 

  
  chartHorBackground              
    .append("text")
    .attr("class", "deg")
    .text("")
    .attr("x", 250)
    .attr("y", 235)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","purple"); 

  chartHorFill              
    .append("text")
    .text("Number of Connections")
    .attr("x", -70)
    .attr("y", 180)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","black")
     .attr("stroke", "green")
        .attr("stroke-width", "0.8px");  
  // chartHorFill              
  //   .append("text")
  //   .text("Connections")
  //   .attr("x", -80)
  //   .attr("y", 140)
  //   .attr("font-family", 'FontAwesome')
  //   .attr("font-size", "20px")
  //   .attr("font-weight", "bold")
  //   .attr("fill","black"); 

  chartHorFill.append("text")
    .attr("class", "wordTitle")
    .text("Most Used Word")
    .attr("x", -80)
    .attr("y", 320)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","black")
    .attr("stroke", "green")
        .attr("stroke-width", "0.8px"); 
chartHorFill
    .append("text")
    .attr("class", "word")
    .text("")
    .attr("x", -80)
    .attr("y", 350)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","black");

function barData(element){

  //
  // Sentimental Analysis
  //    
  chartHorFill
    .select("rect.fil1") 
    .transition()
    .duration(200)
    .attr("width", (element.sentiment/54.05)*400) 
  chartHorBackground              
    .select("text.sent")
    .transition()
    .duration(200)
    .text(element.sentiment.toFixed(2))
    .attr("fill", function(){
      if(element.sentiment<44)
        return "purple"
      else if(element.sentiment<52)
        return "black"
      else
        return "rgb(255,195,255)"
     
    })

  //
  // Degree
  //    
  chartHorFill
    .select("rect.fil2")
    .transition()
    .duration(200)
    .attr("width", (element.degree/27)*400)


  chartHorBackground              
    .select("text.deg")
    .transition()
    .duration(200)
    .text(element.degree.toFixed(2))
    .attr("fill", function(){
      if(element.degree<22)
        return "purple"
      else if(element.degree<26)
        return "black"
      else
        return "rgb(255,195,255)"
    })

     //
  // Most used word
  //    
  chartHorFill              
    .select("text.word")
    .transition()
    .duration(200)
    .text(element.word)
}