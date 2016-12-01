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
        .attr("class", "id")
        .text("")
        .attr("x", 0)
        .attr("y", 20)
        .attr("font-family", 'FontAwesome')
        .attr("font-size", "20px")
        .attr("fill","black"); 
    

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

    var view;

    var tracks = document.getElementById("tracklist1");
    var sentiment = document.getElementById("sentiment1");
    var word = document.getElementById("word1");

     //Toggle stores whether the highlighting is on
    var toggle = 0;

    //Create an array logging what is connected to what
    var linkedByIndex = {};
    var tracklist = {};

    var drag = force.drag()
        .on("dragstart", dragstart);

    var zoom = d3.behavior.zoom()
        .scaleExtent([1,4])
        .on("zoom", zoomed);

    // We load the JSON network file.
    d3.json("graphs/graph_artists.json", function(error, graph) {

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

        function connectedNodes() {
            if (toggle == 0) {
                //Reduce the opacity of all but the neighbouring nodes to 0.3.
                var d = d3.select(this).node().__data__;
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
        var node = view.selectAll(".node")
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
                getData(this.__data__);
                barData(this.__data__);
                artistData(this.__data__);
                trivia(this.__data__);
                // tracks.innerHTML = "";
                // tracks.appendChild(makeUL( d.tracklist));
                // sentiment.innerHTML ="<span style=\"color:white\">"+d.sentiment+ "</span>";
                // word.innerHTML = "<span style=\"color:white\">"+d.word+ "</span>";
             
                
            })
      

// The label each node its node number from the networkx graph.
        node.append("title")
            // .text(function(d) { return d.id; });
            .text(function(d) { 
                // document.getElementById('tracklist').appendChild(makeUL(d.tracklist));
                return "Artist: " + d.id + "\n" + "Degree: " + d.degree + "\n" + "Betweenness: " + d.betw;});
            
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

        svg_data
            .select("text.id")
            .transition()
            .duration(100)
            .text(node.id)
             
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