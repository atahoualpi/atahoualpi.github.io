function showPics(pltext, arccolor){
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
        .attr("id", function(){ return pltext; })
        .attr("width", 200)
        .attr("height", 200)
        // .style("border", "1px solid black");

    // var text = svg2.selectAll("text")
    //     .data([0])
    //     .enter()
    //     .append("text")
    //     .text(pltext)
    //     .attr("x", "40")
    //     .attr("y", "160");

    var g = svg2.append("g");

    var img = g.append("svg:image")
        .attr("xlink:href", "pictures/"+ pltext +".png")
        .attr("x", "-50")
        .attr("y", "50")
        .attr("width", "342")
        .attr("height", "79.5")
        // .on("click", function(){
        // 	console.log("clicked2")
        // 	showbars();
        // });

    // var xSymbol = g.append("svg:image")
    //     .attr("xlink:href", "pictures/xsymb.png")
    //     .attr("x", "132")
    //     .attr("y", "1")
    //     .attr("width", "70")
    //     .attr("height", "16")
    //     .on("click", function(){
    //         isClicked[pltext] = 0;
    //         var index = arr.indexOf(pltext);
    //         if (index > -1) {
    //             arr.splice(index, 1);
    //         }
    //         removebars(pltext);
    //         removepics(pltext);
    //         removeanim(pltext);
    //     })

	// var config = {
	//     "avatar_size" : 48
	// }
 //    var defs = g.append("svg:defs");

	// defs.append("svg:pattern")
	//     .attr("id", "grump_avatar")
	//     .attr("width", config.avatar_size)
	//     .attr("height", config.avatar_size)
	//     .attr("patternUnits", "userSpaceOnUse")
	//     .append("svg:image")
	//     .attr("xlink:href", 'pictures/iPhone.png')
	//     .attr("width", config.avatar_size)
	//     .attr("height", config.avatar_size)
	//     .attr("x", 0)
	//     .attr("y", 0);

	// var circle = g.append("circle")
	//         .attr("cx", config.avatar_size/2)
	//         .attr("cy", config.avatar_size/2)
	//         .attr("r", config.avatar_size/2)
	//         .style("fill", "#fff")
	//         .style("fill", "url(#grump_avatar)");

    showbars(pltext, arccolor);
}

function removepics(pltext){
    d3.select("#" + pltext).remove();
}