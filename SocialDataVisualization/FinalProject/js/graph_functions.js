/**
 * Created by Riccardo on 4/7/2016.
 */

//Width and height
var w = 800;
var h = 800;
//coordinates of center
//var X = -122;
//var Y = 37;
var color_list = ['yellow','limegreen','red','brown','magenta','blue'];



var projection = d3.geo.mercator();

//we define our path generator
var path = d3.geo.path()
    .projection(projection);

var svg = d3.select('svg')//.select("#"+"map_canvas")//.select("body")
    //.append("svg")
    .attr('class', 'my-supah-svg')
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


    // MASK, NOTE>> this is hiding some regions..!
    defs = d3.select('defs');//svg.append('svg:defs'); //creating a defs TAG inside the svg element
    mask = defs.append('svg:mask') //adding a mask TAG inside the defs TAG
        .attr('id', 'regions-mask');
    mask.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path) //d, contains a series of commands and parameters in the SVG Path Mini-Language.
        //These commands and parameters are a sequential set of instructions for how to "move the pen over the paper"
        .style("fill", "white")
        .attr("class", "mask")
    ;
    /* mask.append('rect')
        .attr("width", 250)
        .attr("height", 250)
        //.attr("x", 25)
        //.attr("y", 25)
        .style("fill", "white");*/

//MASK ENDS

    // add a rectangle to see the bound of the svg
    svg.append("rect").attr('width', w).attr('height', h)
        .style('stroke', 'black').style('fill', 'aliceblue');
//filling the svg element
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#2ca25f")//cornflowerblue
        //.style("opacity", "0.5")
        .style("stroke-width", "1.5")
        .style("stroke", "black");


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

  /*  //acquire and display restaurants locations
    d3.json("restaurants.json", function(json) {

        svg.selectAll("restaurants")
            .data(json.features)
            .enter()
            .append("circle")
            .attr("d", path) // ??????????
            .style("fill", "red")
            .attr("transform", function(d, i) {
                console.log(d);
                return "translate(" + projection([1,1]) + ")"; //d.slice(0,2)
                //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
            })
            .attr("r", 5)
            .style("stroke-width", "0.5")
            .style("stroke", "black");
    });
    */
   /* var coords_dataset = [];
    d3.json("restaurants.json", function(json) {

        svg.selectAll("restaurants")
            .data(json)
            .enter()
            .append("circle")
            //.attr("d", path) // ??????????
            .style("fill", "red")
            .attr("r", 5)
            .style("stroke-width", "0.5")
            .style("stroke", "black")
            .attr("transform", function(d) { //function(d, i)

                return "translate(" + projection(d[0]) + ")"; //d.slice(0,2) [1,1]
                //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
            });
    */
        //PUBLIC ARTWORK
/*
        var coords_dataset = [];
    d3.csv("public_artwork.csv", function(data) {
        coords_dataset = data.map(function(d) { return [ +d.Coordinates.substring(20,36), +d.Coordinates.substring(1,18) ]; }); //NOTE: '+' sign converts to number!!
        console.log(coords_dataset[0]);
        console.log(projection(coords_dataset[0]));
        console.log(projection([-37,144]));

        svg.selectAll("restaurants")
            .data(coords_dataset)
            .enter()
            .append("circle")
            //.attr("d", path) // ??????????
            .style("fill", "blue")
            .attr("r", 5)
            .style("stroke-width", "0.5")
            .style("stroke", "black")
            .attr("transform", function(d) { //function(d, i)
                console.log(d+'\n'+projection(d));
                return "translate(" + projection(d) + ")"; //d.slice(0,2) [1,1]
                //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
            });*/

//PEDESTRIAN COUNT

/* var coords_dataset = [];
 d3.csv("pedestrianExample.csv", function(data) {
console.log(data[0]);
 svg.selectAll("pedestrian")
 .data(data)
 .enter()
 .append("circle")
 //.attr("d", path) // ??????????
 .style("fill", "red")
 .attr("r", function(d){
     return d['Quantity']/200
 })
 .style("stroke-width", "0.5")
 .style("opacity", "0.5")
 .attr("transform", function(d) { //function(d, i)
 console.log(d+'\n'+projection(d));
 return "translate(" + projection([d['X'],d['Y']]) + ")"; //d.slice(0,2) [1,1]
 //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
 });
    });*/

//ENVIRONMENTAL


   /* svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "#2ca25f")//cornflowerblue
        //.style("opacity", "0.5")
        .style("stroke-width", "1.5")
        .style("stroke", "black");*/

    //svg.selectAll("environmental").attr('mask', 'url(#regions-mask)');

    var coords_dataset = [];
    var envir = svg.append('g')
    d3.csv("Danger_Prediction.csv", function(data) {
       // console.log(makeGradientColor(red, blue, 100));
        envir.selectAll("environmental")
            .data(data)
            .enter()
            .append("rect")
            //.attr("d", path) // ??????????
            .style("fill", function(d){
                //return makeGradientColor(blue, red, d['Danger Level']*10).cssColor;
                if(d['Danger Level'] <3) //LOW Danger
                    return '#0000ff';
                else if(d['Danger Level'] <6) //LOW-MEDIUM Danger
                    return '#ffff00';
                else if(d['Danger Level'] <9) //MEDIUM-HIGH Danger
                    return '#ff9933';
                else
                    return '#ff0000'; //HIGH Danger
            })
            .attr("width", 38.5).attr("height", 40.5) //was 6 with subdiv=100

            .style("stroke-width", "0.5")
            .style("opacity", "0.5")
            .attr("transform", function(d) { //function(d, i)
                //console.log(d+'\n'+projection(d));
                return "translate(" + projection([d['Longitude'],d['Latitude']]) + ")"; //d.slice(0,2) [1,1]
                //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
            })

        ;
    });


    envir.attr('mask', 'url(#regions-mask)');



});

