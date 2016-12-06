// We load the 3rd version of d3.js from the Web.
// require.config({paths: {d3: "https://d3js.org/d3.v3.min"}});
// require(["d3"], function(d3) {
// function start(){
    // var width = self.frameElement ? 960 : innerWidth,
    //     height = self.frameElement ? 500 : innerHeight;
    // Parameter declaration, the height and width of our viz.
    var width = 700,
        height = 500;
    // var width = svg.style("width"),
    //     height = svg.style("height");

    // Colour scale for node colours.
    var color = d3.scale.category10();

    // We create a force-directed dynamic graph layout.
    // D3 has number of layouts - refer to the documentation.
    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    var releaseTitles = "";

   // get data stuff
    var svg_data = d3.select("#content").select("svg")
    if (svg_data.empty()) {
     var svg_data = d3.select("#content")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", "white");
    }
    var g_data = svg_data.append("g")
        g_data.append("rect")
            .attr("class", "back_rect")
            .attr("width", width)
            .attr("height", height)

    svg_data
        .append("text")
        .text("Artist:")
        .attr("x", 0)
        .attr("y", 30)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "30px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px"); 
    svg_data
        .append("text")
        .attr("class", "title")
        .text("Release Titles")
        .attr("x", 0)
        .attr("y", 180)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "30px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px")
            .append("svg:title")
            .attr("class", "tittip")
            .text(function(d){ return releaseTitles;});
    svg_data
        .append("text")
        .attr("class", "mouseover")
        .text("")
        .attr("x", 220)
        .attr("y", 180)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black")
        
    svg_data
        .append("text")
        .attr("class", "id")
        .text("")
        .attr("x", 100)
        .attr("y", 30)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black"); 
    svg_data
        .append("text")
        .text("Country:")
        .attr("x", 0)
        .attr("y", 130)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "30px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px"); 
    svg_data
        .append("text")
        .attr("class", "country")
        .text("")
        .attr("x", 140)
        .attr("y", 130)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black");
     svg_data
        .append("text")
        .text("Genres:")
        .attr("x", 0)
        .attr("y", 80)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "30px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px"); 
    svg_data
        .append("text")
        .attr("class", "genre")
        .text("")
        .attr("x", 120)
        .attr("y", 80)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black"); 
    svg_data
        .append("text")
        .text("Labels:")
        .attr("x", 0)
        .attr("y", 230)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "30px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px"); 
    svg_data
        .append("text")
        .attr("class", "label")
        .text("")
        .attr("x", 120)
        .attr("y", 230)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black"); 
    svg_data
        .append("text")
        .text("Available releases for sale on Discogs:")
        .attr("x", 0)
        .attr("y", 280)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "25px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px");
    svg_data
        .append("text")
        .attr("class", "num_for_sale")
        .text("")
        .attr("x", 480)
        .attr("y", 280)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black");
    svg_data
        .append("text")
        .text("People that want releases of this artist:")
        .attr("x", 0)
        .attr("y", 330)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "25px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px");
    svg_data
        .append("text")
        .attr("class", "want")
        .text("")
        .attr("x", 490)
        .attr("y", 330)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black");
    svg_data
        .append("text")
        .text("People that have releases of this artist:")
        .attr("x", 0)
        .attr("y", 380)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "25px")
        .attr("fill","black")
        .attr("stroke", "green")
        .attr("stroke-width", "0.8px");
    svg_data
        .append("text")
        .attr("class", "have")
        .text("")
        .attr("x", 490)
        .attr("y", 380)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black");
    
    // var g_data_bars = g_data.append("g")
    //     g_data_bars.append("rect")
    //         .attr("class", "contentBars")
    //         .attr("width", 500)
    //         .attr("height", 500)
    //         .attr("x", 0)
    //         .attr("y", 220)

    // We select the < div> we created earlier and add an  container.
    // SVG = Scalable Vector Graphics
    var svg = d3.select("#d3-container").select("svg")
    if (svg.empty()) {
        svg = d3.select("#d3-container")
                    .on("touchstart", nozoom)
                    .on("touchmove", nozoom)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
    }
    var mostStylArtist = "";
    var commonStyles = 0;

    var view;
    var node;

    var tracks = document.getElementById("tracklist1");
    var sentiment = document.getElementById("sentiment1");
    var word = document.getElementById("word1");

     //Toggle stores whether the highlighting is on
    var toggle = 0;
    var toggle1click = 0;

    //Create an array logging what is connected to what
    var linkedByIndex = {};
    var linkedByCommunity = {};

    var tracklist = {};

    var drag = force.drag()
        .on("dragstart", dragstart);

    var zoom = d3.behavior.zoom()
        .scaleExtent([0.25,4])
        .on("zoom", zoomed);

    var allCommunities;
    // var max_sent;
    // var max_betw;

    d3.json("graphs/communities.json", function(error2, community) {
        allCommunities = community;
        for (var key in community) {
            linkedByCommunity[community[key]] = [];
        }
        for (var key in community) {
           if (community.hasOwnProperty(key)) {
              linkedByCommunity[community[key]].push(key);
           }
          
        }

    });
    
    // We load the JSON network file.
    d3.json("graphs/graph_artists.json", function(error, graph) {
   
        // alert("Choose a node in the graph");
        var g = svg.append("g")
                .call(zoom);

        g.append("rect")
            .attr("width", width)
            .attr("height", height)
            .on("click", clicked);


        view = g.append("g")
            .attr("class", "view");


        for (var i = 0; i < graph.nodes.length; i++) {
            linkedByIndex[i + "," + i] = 1;
        };

        graph.links.forEach(function (d) {
            linkedByIndex[d.source + "," + d.target] = 1;
        });


        //Looks up whether a pair of nodes are neighbours.
        function neighboring(a, b) {
            return linkedByIndex[a + "," + b];
        }

        //Looks up whether a pair of nodes are in the same community.
        function areCommunity(a, b) {
            if(linkedByCommunity[allCommunities[a]].indexOf(b) >= 0)
                return true;
            else
                return false;
        }

        function connectedNodes(d) {
            if (toggle == 0) {
                //Reduce the opacity of all but the neighbouring nodes to 0.3.
                // var d = d3.select(this).node().__data__;
                node.style("opacity", function (o) {
                    return neighboring(d.index, o.index) | neighboring(o.index, d.index) ? 1 : 0.3;
                });
                
                //Reduce the opacity of all but the neighbouring edges to 0.8.
                link.style("opacity", function (o) {
                    return d.index==o.source.index | d.index==o.target.index ? 1 : 0.8;
                });
                //Increases the stroke width of the neighbouring edges.
                link.style("stroke-width", function (o) {
                    return d.index==o.source.index | d.index==o.target.index ? 3 : 0.8;
                });

                //Reset the toggle.
                toggle = 1;
            } else {
                //Restore everything back to normal
                node.style("opacity", 1);
                link.style("opacity", 1);
                link.style("stroke-width", 1);
                toggle = 0;
            }
        }

        function showOnNetowrk(d) {
        
            //Reduce the opacity of all but the neighbouring nodes to 0.3.
            // var d = d3.select(this).node().__data__;
            mostStylArtist = "<Noone>";
            commonStyles = 0;           
            if (toggle1click == 0) {
                node.attr("r", function (o) {  
                    
                    if (d.id != o.id){
                        if (neighboring(d.index, o.index) | neighboring(o.index, d.index)){
                            var counter = 0;
                            for (var dstyl in d.styles){                            
                                for (var ostyl in o.styles){
                                    if (d.styles[dstyl] == o.styles[ostyl]){
                                        counter++;
                                    }
                                }
                            }
                            if (counter > commonStyles){
                                commonStyles = counter;
                                mostStylArtist = o.id;
                            }
                        } 
                        return 6;
                    }
                    else
                        return 9;
                });
                node.style("stroke-width", function (o) {              
                    return areCommunity(d.id, o.id) ? 3 : 1.5;
                })
                .style("stroke", function (o) {  
                    return areCommunity(d.id, o.id) ? "black" : "white";
                });
                //Reset the toggle.
                toggle1click = 1;
            } else {
                //Restore everything back to normal
                node.attr("r", 6);
                node.style("stroke-width", 1.5);
                node.style("stroke", "white");
                toggle1click = 0;
            }
        }


        // Within this block, the network has been loaded
        // and stored in the 'graph' object.

        // We load the nodes and links into the force-directed
        // graph and initialise the dynamics.
        force.nodes(graph.nodes)
            .links(graph.links)
            .start();

        // We create a < line> SVG element for each link
        // in the graph.
        var link = view.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link");

        // We create a < circle> SVG element for each node
        // in the graph, and we specify a few attributes.
        node = view.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 6)  // radius
            .style("fill", function(d) {
                // We colour the node depending on the degree.
                return color(d.degree); 
            })
            .call(force.drag)
            .call(drag)
            .on('dblclick', connectedNodes)
            .on("click", function(d){
                showOnNetowrk(this.__data__);
                getData(this.__data__);
                barData(this.__data__);
                artistData(this.__data__, allCommunities[this.__data__.id]);
                trivia(this.__data__);   
                document.getElementById("wordcloudpic").src="wordcloud/"+d.id+".png";           
                
            })
      

// The label each node its node number from the networkx graph.
        node.append("title")
            // .text(function(d) { return d.id; });
            .text(function(d) { 

                // document.getElementById('tracklist').appendChild(makeUL(d.tracklist));
                return "Artist: " + d.id + "\n" + "Degree: " + d.degree + "\n" + "Deg_centr: " + d.deg_centr + "\n" + "Betweenness: " + d.betw+ "\n" + "Style: " + d.styles;});
            
        // We bind the positions of the SVG elements
        // to the positions of the dynamic force-directed graph,
        // at each time step.
        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });


    });

    function getData(node){
        // d3.selectAll("#content > *").remove();
        releaseTitles = node.title;
        num_data = [node.num_for_sale, node.have, node.want];

        svg_data
            .select("text.id")
            .transition()
            .duration(100)
            .text(node.id)   
        svg_data
            .select("text.genre")
            .transition()
            .duration(100)
            .text(node.genres)  
        svg_data
            .select("text.label")
            .transition()
            .duration(100)
            .text(node.labels) 
        svg_data
            .select("text.country")
            .transition()
            .duration(100)
            .text(node.country) 
        svg_data
            .select("text.mouseover")
            .transition()
            .duration(100)
            .text("(mouse over to see titles)") 
        svg_data              
            .select("title.tittip")
            .text(function(d){ return releaseTitles;}); 
        svg_data
            .select("text.num_for_sale")
            .transition()
            .duration(100)
            .text(node.num_for_sale) 
        svg_data
            .select("text.have")
            .transition()
            .duration(100)
            .text(node.have)
        svg_data
            .select("text.want")
            .transition()
            .duration(100)
            .text(node.want)

// var heightbar = 500;
// var widthbar = 500;

// // var width = 960,
// //     height = 500;

// var y = d3.scale.linear()
//     .range([heightbar, 0]);

// // var chart = d3.select(".chart")
// //     .attr("width", widthbar)
// //     .attr("height", heightbar);

// // d3.tsv("data.tsv", type, function(error, data) {
//   y.domain([0, d3.max(num_data, function(d) { return d; })]);

//   var barWidth = widthbar / num_data.length;

//   var bar = g_data_bars.selectAll("rect")
//       .data(num_data)
//         .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

//   bar.append("rect")
//       .attr("y", function(d) { return y(d); })
//       .attr("height", function(d) { return heightbar - y(d); })
//       .attr("width", barWidth - 1);

//   bar.append("text")
//       .attr("x", barWidth / 2)
//       .attr("y", function(d) { return y(d) + 3; })
//       .attr("dy", ".75em")
//       .text(function(d) { return d; });
// });

// }

    }

    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);    
    }

    function zoomed() {
        // if(toggle == 1)
            view.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    }

    function clicked(d, i) {
        if (d3.event.defaultPrevented) return; // zoomed
    
    // tracks.innerHTML = "";
    // sentiment.innerHTML = "";
    // word.innerHTML = "";

      d3.select(this).transition()
          .style("fill", "black")
        .transition()
          .style("fill", "orange");
    }

    function nozoom() {
        d3.event.preventDefault();
    }
 
// });
    function makeUL(array) {
        // Create the list element:
        var list = document.createElement('ol');

        for(var i = 0; i < array.length; i++) {
            // Create the list item:
            var item = document.createElement('li');
            item.style.color = "white";
            // Set its contents:
            item.appendChild(document.createTextNode(array[i]));

            // Add it to the list:
            list.appendChild(item);
        }

        // Finally, return the constructed list:
        return list;
    }

// }