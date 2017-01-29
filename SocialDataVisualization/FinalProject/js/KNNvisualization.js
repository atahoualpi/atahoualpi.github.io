/**
 * Created by Riccardo on 5/10/2016.
 */
function fillTreesSVG(svgID){

//Width and height
var w = 800;
var h = 800;

var color_list = ['limegreen','yellow','orange','crimson'];
//['limegreen','yellow','orange','crimson']
var tileWidth = 37.5;
var tileHeight = 39.5;


var projection = d3.geo.mercator();

//we define our path generator
var path = d3.geo.path()
    .projection(projection);

var svg = d3.select('#'+svgID)//.select("#"+"map_canvas")//.select("body")
    //.append("svg")
    .attr('class', 'treeSVG')
    .attr("width", w)
    .attr("height", h);


//acquire and display shape of map
d3.json("melbourne_regions.geojson", function(json) { //melbourne

    //centering the map
    var b = path.bounds(json),
        s = 0.95 / Math.max(
                (b[1][0] - b[0][0]) / w,
                (b[1][1] - b[0][1]) / h
            );
    //Use the d3.geo.bounds method to find the bounding box in map units:
    b = d3.geo.bounds(json);
    //Set the center of the projection to the center of the bounding box:
    projection.center([(b[1][0] + b[0][0]) / 2, (b[1][1] + b[0][1]) / 2]);
    //Use the translate method to move the center of the map to the center of the canvas:
    projection.translate([w / 2, h / 2]);
    //Scale ti fit all
    var scale = 55;
    var hscale = scale * w / (b[1][0] - b[0][0]);
    var vscale = scale * h / (b[1][1] - b[0][1]);
    scale = (hscale < vscale) ? hscale : vscale;
    projection.scale(scale);
    //new Path
    path = path.projection(projection);

    // CLIP PATH definition
    defs = d3.select('defs');//svg.append('svg:defs'); //creating a defs TAG inside the svg element
    mask = defs.append('svg:clipPath')//mask') //adding a mask TAG inside the defs TAG
        .attr('id', 'regions-mask');
    mask.selectAll("gianni")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path) //d, contains a series of commands and parameters in the SVG Path Mini-Language.
        //These commands and parameters are a sequential set of instructions for how to "move the pen over the paper"
        .style("fill", "white")
        .attr("class", "mask")
    ;
//CLIP PATH ENDS

    // add a rectangle to see the bound of the svg
    svg.append("rect").attr('width', w).attr('height', h)
        .style('stroke', 'black').style('fill', 'aliceblue');

//TREES DATA
    var tooltipID = "myTooltipTrees";
    var myTool = d3.select("#"+tooltipID);/*d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .html("abcdefg");*/

    var coords_dataset = [];
    var envir = svg.append('g')
    d3.csv("Danger_Prediction.csv", function(data) {

        envir.selectAll("environmental")
            .data(data)
            .enter()
            .append("rect")

            .style("fill", function(d){
                //return makeGradientColor(blue, red, d['Danger Level']*10).cssColor;
                if(d['Danger Level'] <3) //LOW Danger
                    return color_list[0];
                else if(d['Danger Level'] <6) //LOW-MEDIUM Danger
                    return color_list[1];
                else if(d['Danger Level'] <9) //MEDIUM-HIGH Danger
                    return color_list[2];
                else
                    return color_list[3]; //HIGH Danger
            })
            .attr("width", tileWidth).attr("height", tileHeight) //was 6 with subdiv=100
            .style("opacity", "0.5")
            .attr("transform", function(d) { //function(d, i)

                return "translate(" + projection([d['Longitude'],d['Latitude']]) + ")"; //d.slice(0,2) [1,1]
                //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
            })
            .on("mouseover", function(d){  //Mouse event
                //var matrix = this.getScreenCTM()
                //    .translate(+this.getAttribute("cx"),
                //        +this.getAttribute("cy")); //explanation at http://codepen.io/recursiev/pen/zpJxs

                myTool.html("<h5><b><p>Center of Area: (" +d['Longitude']+','+d['Latitude']+")</p><p>Danger for allergies: "+d['Danger Level']+"/10</p></b></h5>");
                tooltipDimensions = [myTool.node().offsetWidth,myTool.node().offsetHeight];
                var lon = d['Latitude'];
                var lat = d['Longitude'];
                var pixelPosInSVG = projection([lat,lon]);
                var tooltipParentOffset = $('#'+tooltipID).parent().offset();
                var svgOffset =     $('#'+svgID).offset();

                d3.select(this)
                    .style("opacity", "1")

                myTool
                    .style("left", ( svgOffset.left - tooltipParentOffset.left + pixelPosInSVG[0] - tooltipDimensions[0]/2 +tileWidth/2)+"px")
                    .style("top",  (2110+ svgOffset.top - tooltipParentOffset.top + pixelPosInSVG[1] - tooltipDimensions[1] - 10 +tileHeight)+"px")
                    .style("border", function(){

                        if(d['Danger Level'] <3) //LOW Danger
                            return "solid "+color_list[0];
                        else if(d['Danger Level'] <6) //LOW-MEDIUM Danger
                            return "solid "+color_list[1];
                        else if(d['Danger Level'] <9) //MEDIUM-HIGH Danger
                            return "solid "+color_list[2];
                        else
                            return "solid "+color_list[3]; //HIGH Danger
                    })

                    .style("opacity", "1")
                    .style("display", "block")  //The tooltip appears
            })
            .on("mouseout", function(d){  //Mouse event
                d3.select(this)
                    //.transition()
                   // .duration(500)
                    //.attr("x", 30)//function(d) { return x(d.cocoa) - 20; })
                    //.style("cursor", "normal")
                    //.attr("width", 40)
                .style("opacity", "0.5")
                myTool
                    //.transition()  //Opacity transition when the tooltip disappears
                    //.duration(500)
                    .style("opacity", "0")

                    //.style("display", "none")  //The tooltip disappears
            })

        ;
        envir.attr('clip-path', 'url(#regions-mask)'); //mask
        //once the background is displayed
        //acquire and display border of the regions
        /*svg.selectAll("borders")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "transparent")//"#2ca25f")//cornflowerblue
            //.style("opacity", "0.5")
            .style("stroke-width", "1.5")
            .style("stroke", "black");*/

        //add a squared rect to clip path with the regions to


        //acquire and display shape of lakes and rivers
        d3.json("melbourne_water.geojson", function(json) {

            svg.selectAll("water")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)   // ??????????
                .style("fill", "#99d8c9")
                //.style("opacity", "0.5")
                .style("stroke-width", "1.5")
                .style("stroke", "black")
            ;
        });

    });



});

}