function showPics(pltext){
	// var svg2 = d3.select("body").append("svg")
 //      .data(data)
 //      .attr("width", width)
 //      .attr("height", height)
 //      .attr("class", "picsvg")
 //      .append("g")
 //      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 var svg2 = d3.select("#firstcol")
        .append("svg")
        .attr("class", "svgimg")
        .attr("width", 200)
        .attr("height", 200)
        .style("border", "1px solid black");

    var text = svg2.selectAll("text")
        .data([0])
        .enter()
        .append("text")
        .text("Testing")
        .attr("x", "40")
        .attr("y", "60");

    var g = svg2.append("g");

    var img = g.append("svg:image")
        .attr("xlink:href", "pictures/iPhone.png")
        .attr("x", "20")
        .attr("y", "20")
        .attr("width", "228")
        .attr("height", "53")
        // .on("click", function(){
        // 	console.log("clicked2")
        // 	showbars();
        // });

	var config = {
	    "avatar_size" : 48
	}
    var defs = g.append("svg:defs");

	defs.append("svg:pattern")
	    .attr("id", "grump_avatar")
	    .attr("width", config.avatar_size)
	    .attr("height", config.avatar_size)
	    .attr("patternUnits", "userSpaceOnUse")
	    .append("svg:image")
	    .attr("xlink:href", 'pictures/iPhone.png')
	    .attr("width", config.avatar_size)
	    .attr("height", config.avatar_size)
	    .attr("x", 0)
	    .attr("y", 0);

	var circle = g.append("circle")
	        .attr("cx", config.avatar_size/2)
	        .attr("cy", config.avatar_size/2)
	        .attr("r", config.avatar_size/2)
	        .style("fill", "#fff")
	        .style("fill", "url(#grump_avatar)");

    showbars(pltext);
}