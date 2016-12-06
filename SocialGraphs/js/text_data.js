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

var restCommun = "";

// g_sev.select("#sentiment1")
// svg_several.select("#sentiment1")
// g_sev.append("text")
//     .attr("class", "sentTitle")
//     .text("Sentimental Analysis")
//     .attr("x", 0)
//     .attr("y", 30)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "30px")
//     .attr("fill","white"); 
//  g_sev.append("text")
//     .attr("class", "sent")
//     .text("")
//     .attr("x", 0)
//     .attr("y", 60)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "20px")
//     .attr("fill","white"); 
g_sev
        .append("text")
        .attr("class", "relevance")
        .text("Most common styles")
        .attr("x", 0)
        .attr("y", 50)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "30px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px"); 
g_sev
    .append("text")
    .attr("class", "moststyles")
    .text("")
    .attr("x", 0)
    .attr("y", 80)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","black");
    g_sev
        .append("text")
        .attr("class", "clicktosee")
        .text("")
        .attr("x", 50)
        .attr("y", 100)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "15px")
        .attr("fill","black");
// g_sev.append("text")
//     .attr("class", "wordTitle")
//     .text("Most Used Word")
//     .attr("x", 0)
//     .attr("y", 140)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "30px")
//     .attr("fill","black")
//     .attr("stroke", "green")
//         .attr("stroke-width", "0.8px"); 
// g_sev
//     .append("text")
//     .attr("class", "word")
//     .text("")
//     .attr("x", 0)
//     .attr("y", 170)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "20px")
//     .attr("fill","black");

// g_sev
//     .append("text")
//     .attr("class", "track")
//     .text("")
//     .attr("x", 0)
//     .attr("y", 220)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "20px")
//     .attr("fill","black"); 
g_sev.append("text")
    .attr("class", "communTitle")
    .text("Community")
    .attr("x", 0)
    .attr("y", 200)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","black")
    .attr("stroke", "green")
    .attr("stroke-width", "0.8px")
    .append("svg:title")
    .attr("class", "tooltip")
    .text(function(d){ return restCommun;});
g_sev
    .append("text")
    .attr("class", "commun")
    .text("")
    .attr("x", 0)
    .attr("y", 230)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","black")

g_sev
    .append("text")
    .attr("class", "tip")
    .text("")
    .attr("x", 180)
    .attr("y", 200)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "15px")
    .attr("fill","black")

// g_sev
//     .append("text")
//     .attr("class", "distTitle")
//     .text("Distance **")
//     .attr("x", 0)
//     .attr("y", 320)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "30px")
//     .attr("fill","black")
//     .attr("stroke", "green")
//     .attr("stroke-width", "0.8px"); 
g_sev
    .append("text")
    .attr("class", "distTitle")
    .text("The most related artist is:")
    .attr("x", 0)
    .attr("y", 330)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "30px")
    .attr("fill","black")
    .attr("stroke", "green")
    .attr("stroke-width", "0.8px"); 

g_sev
    .append("text")
    .attr("class", "dist")
    .text("")
    .attr("x", 0)
    .attr("y", 370)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "20px")
    .attr("fill","black")
g_sev
    .append("text")
    .attr("class", "tip2")
    .text("")
    .attr("x", 10)
    .attr("y", 390)
    .attr("font-family", 'FontAwesome')
    .attr("font-size", "15px")
    .attr("fill","black")
// g_sev.append("text")
//     .attr("class", "TrackTitle")
//     .text("Tracklist")
//     .attr("x", 0)
//     .attr("y", 480)
//     .attr("font-family", 'FontAwesome')
//     .attr("font-size", "30px")
//     .attr("fill","black")
//     .attr("stroke", "green")
//     .attr("stroke-width", "0.8px"); 
     


function artistData(element, communIndex){
    // console.log(linkedByCommunity[communIndex])
  restCommun = linkedByCommunity[communIndex];
  document.getElementById('tracklist').appendChild(makeUL(element.tracklist));
  //
  // Sentimental Analysis
  //    
  // svg_several              
  //   .select("text.sent")
  //   .transition()
  //   .duration(200)
  //   .text(element.sentiment.toFixed(2))
  //
  // relevance
  //
  
        svg_several              
    .select("text.moststyles")
    .transition()
    .duration(200)
        .text("most common styles (" + commonStyles + ") with: " + mostStylArtist)
   svg_several
        .select("text.clicktosee")
        .transition()
        .duration(100)
        .text("Double click on a node to see all related artists.") 
  
  // //
  // // Most used word
  // //    
  // svg_several              
  //   .select("text.word")
  //   .transition()
  //   .duration(200)
  //   .text(element.word)

  //
  // Tracklist
  //    
  svg_several              
    .select("text.track")
    .transition()
    .duration(200)
    .text(element.tracklist)

  //
  // Community
  //    
  svg_several              
    .select("text.commun")
    .transition()
    .duration(200)
    .text("Part of a community with " + linkedByCommunity[communIndex].length + " other artists")

  svg_several              
    .select("title.tooltip")
    .text(function(d){ return restCommun;}); 
svg_several              
    .select("text.tip")
    .transition()
    .duration(200)
    .text("(mouse over to see members of the community)")

    //
    // Distance
    //    
    var sent_array = [];
    var betw_array = [];

    node.attr("transform", function(d){
        if(restCommun.indexOf(d.id) >= 0 ){
            sent_array.push(d.sentiment)
            betw_array.push(d.betw)

        }
        // console.log(d1,d2)
        return "translate(0,0)"})
    var max_sent = Math.max.apply(Math, sent_array);
    var max_betw = Math.max.apply(Math, betw_array);
    var d_array = [];
    var id_array = [];
    node.attr("transform", function(d){
        if(restCommun.indexOf(d.id) >= 0 ){
            d_array.push(Math.sqrt(Math.pow((element.sentiment/max_sent - d.sentiment/max_sent),2) + Math.pow((element.betw/max_betw - d.betw/max_betw),2) ));
            id_array.push(d.id);
        }
        // console.log(d1,d2)
        return "translate(0,0)"})

    var mostRelevant = id_array[d_array.indexOf(d_array.sort()[1])]

  svg_several              
    .select("text.dist")
    .transition()
    .duration(200)
    .text(mostRelevant+ " with distance " + d_array.sort()[1].toFixed(4) )
svg_several              
    .select("text.tip2")
    .transition()
    .duration(200)
    .text("** calculated using sentimental analysis and betweenness centrality")
}


function makeUL(array) {
    d3.selectAll("#tracklist > *").remove();

    // Create the list element:
    var list = document.createElement('ol');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}


