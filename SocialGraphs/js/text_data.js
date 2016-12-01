// get data stuff
var svg_several = d3.select("#sever").select("svg")
if (svg_several.empty()) {
 var svg_several = d3.select("#sever")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
         
}
var g_sev = svg_several.append("g")
    g_sev.append("rect")
        .attr("class", "back_rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "orange");

// g_sev.select("#sentiment1")
// svg_several.select("#sentiment1")
g_sev.append("text")
    .attr("class", "sentTitle")
    .text("Sentimental Analysis")
    .attr("x", 0)
    .attr("y", 30)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","white"); 
 g_sev.append("text")
    .attr("class", "sent")
    .text("lalalalililililililililililililililililili")
    .attr("x", 0)
    .attr("y", 60)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","white"); 
g_sev.append("text")
    .attr("class", "wordTitle")
    .text("Most Used Word")
    .attr("x", 0)
    .attr("y", 90)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","white"); 
g_sev
    .append("text")
    .attr("class", "word")
    .text("lililililililililililililililililililililililili")
    .attr("x", 0)
    .attr("y", 120)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","white");
g_sev.append("text")
    .attr("class", "TrackTitle")
    .text("Tracklist")
    .attr("x", 0)
    .attr("y", 150)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","white"); 
g_sev
    .append("text")
    .attr("class", "track")
    .text("lolooolilililililililililililililililililililili")
    .attr("x", 0)
    .attr("y", 180)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","white"); 


function artistData(element){

  //
  // Sentimental Analysis
  //    
  svg_several              
    .select("text.sent")
    .transition()
    .duration(200)
    .text(element.sentiment.toFixed(2))
  
  //
  // Most used word
  //    
  svg_several              
    .select("text.word")
    .transition()
    .duration(200)
    .text(element.word)

  //
  // Tracklist
  //    
  svg_several              
    .select("text.track")
    .transition()
    .duration(200)
    .text(element.tracklist)
    
}