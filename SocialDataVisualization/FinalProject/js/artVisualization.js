function fillartSVG(svgID){

//Width and height
    var w = 800;
    var h = 800;
//coordinates of center
//var X = -122;
//var Y = 37;
    var color_list = ['yellow','limegreen','red','brown','magenta','blue','cyan','burlywood','BlueViolet','chocolate','cornsilk','DarkSeaGreen','LightPink','khaki','MediumAquamarine'];


    var melbournePixelCentroid = [];
    var prevPixelCentroid = [];
    var zoomAnimationTime = 750;
    var appearanceAnimationTime = 250;
    var pointRadius = 5;
    var pointStrokeWidth = 0.5;
    var pointRadiusOnZoom = 9;
    var pointStrokeWidthOnZoom = 2;
    var centersIconScale = 0.4;
    var zoomedCentersIconScale = 0.5;
    var defaultInteractionFunctions = [];

//mask for the icon of cluster centers
    var artymbolMask = d3.select("defs").append("svg:mask").attr("id","artymbolMask");
    artymbolMask.append("circle").attr("cx",0).attr("cy",0).attr("r",50).attr("fill","white");

    var projection = d3.geo.mercator();

//we define our path generator
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select('#'+svgID)//.select("#"+"map_canvas")//.select("body")
        //.append("svg")
        .attr('class', 'my-supah-svg')
        .attr("width", w)
        .attr("height", h);
    
    var tooltipID = "myArtTooltip";
    var myTool = d3.select("#"+tooltipID);/*d3.select("defs")
     .append("div")
     .attr("class", "tooltip")
     .html("CIAO GIANNI");*/

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
        //console.log(b[1][0] +'  '+ b[1][1]);
        //For later use save the path center in pixel coordinates
        melbournePixelCentroid = projection([(b[1][0] + b[0][0]) / 2, (b[1][1] + b[0][1]) / 2]);
        prevPixelCentroid = [w/2,h/2];
        //Set the center of the projection to the center of the bounding box:
        projection.center([(b[1][0] + b[0][0]) / 2, (b[1][1] + b[0][1]) / 2]);
        //console.log(prevPixelCentroid);
        //Use the translate method to move the center of the map to the center of the canvas:
        projection.translate([w / 2, h / 2]);
        //Scale ti fit all
        var scale = 55;
        var hscale = scale * w / (b[1][0] - b[0][0]);
        var vscale = scale * h / (b[1][1] - b[0][1]);
        scale = (hscale < vscale) ? hscale : vscale;
        //projection.scale(scale);
        //saving for later zoom-back use and assign the new scale at the same time
        var defaultProjection = projection.scale(scale);
        //new Path
        path = path.projection(projection);

        var defaultPath = path;

        // add a rectangle to see the bound of the svg
        svg.append("rect").attr('width', w).attr('height', h)
            .style('stroke', 'black').style('fill', 'aliceblue');
//filling the svg element with the Melbourne regions
        var regionsPath = svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "#2ca25f")//cornflowerblue
            //.style("opacity", "0.5")
            .style("stroke-width", "1.5")
            .style("stroke", "black");


        //acquire and display shape of lakes and rivers
        d3.json("melbourne_water.geojson", function (json) {

            svg.selectAll("water")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)// ties this path to the common one that use the defined projection !!
                .style("fill", "#99d8c9")
                //.style("opacity", "0.5")
                .style("stroke-width", "1.5")
                .style("stroke", "black")

            ;
        });
        var art, artCenters;
        //acquire and display art
        d3.csv("art_data.csv", function (data) {

            art = svg.selectAll("art")
                .data(data)
                .enter()
                .append("circle")
                .attr("d", path)
                .style("fill", "grey")
                .attr("transform", function(d, i) {
                    return "translate(" + projection([d['Latitude'],d['Longitude']]) + ")"; //d.slice(0,2)
                    //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
                })
                .attr("r", 5)
                .attr('cluster', function(d){ return d.Cluster})
                .attr('lon', function(d){return d.Longitude})
                .attr('lat', function(d){return d.Latitude})
                .attr('name', function(d){return d.Name})
                .attr('type', function(d){return d.Type})
                .attr('artist', function(d){return d.Artist})
                .attr('year', function(d){return d.Year})
                .attr('street', function(d){return d.Address})
                .attr('description', function(d){return d.Description})
                .style("stroke-width", "0.5")
                .style("stroke", "black")
                .on("mouseover", function(d) {  //Mouse event

                    art.filter(function(){ return d3.select(this).attr('cluster') == d.Cluster; })
                        .style("fill", color_list[+d.Cluster]);

                })

                .on("mouseout", function(d) {  //Mouse event
                    art
                        .style("fill", "grey");
                })
                .on("click",function(){
                    var pointClusterNumber = d3.select(this).attr('cluster');
                    //console.log(pointClusterNumber);
                    var ownCenter = artCenters.each(function(){
                        if(+d3.select(this).attr('cluster') == pointClusterNumber) {

                            var event = new MouseEvent('click', {
                                'view': window,
                                'bubbles': true,
                                'cancelable': true
                            });
                            d3.select(this).node().dispatchEvent(event); //NOTE: the function requires a DOM element, that is obtainable with function node() !!
                        }
                        // return +d3.select(this).attr('cluster') == pointClusterNumber;
                    });

                })

            ;


            //acquire and display Cluster Centers of art
            var myRe = /\+*\-*[0-9]+\.[0-9]+/g; //defined here but it will be used later
            d3.csv("art_clusters.csv", function (data) {

                var clusterIndex =0;
                artCenters= svg.selectAll("centers")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("cluster", function(d,i){clusterIndex=i; return i;})
                    /*.call(function(group){
                     group.attr("mask","url(#artymbolMask)");//.attr("transform","translate(300,300)scale(0.5)");
                     console.log("here");
                     group.append("rect").attr("width",100).attr("height",100).attr("x",0).attr("y",0).style("fill",color_list[clusterIndex]);
                     group.append("image").attr("xlink:href","restaurantIcon.png").attr("width",70).attr("height",70).attr("transform","translate(20,20)");

                     })*/

                    /* .append("circle")
                     .style("fill", function(d,i){
                     return color_list[i];
                     })*/
                    .attr("transform", function(d, i) {
                        return "translate(" + projection([d['Latitude'],d['Longitude']]) + ")scale("+centersIconScale+")"; //d.slice(0,2)
                        //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
                    })
                    //.attr("r", 15)

                    .attr('lon', function(d){return d.Longitude})
                    .attr('lat', function(d){return d.Latitude})
                    // .style("stroke-width", "3")
                    // .style("stroke", "black")
                    .on("mouseover", function(d,i) {  //Mouse event

                        art.filter(function(){ return d3.select(this).attr('cluster') == i; })
                            .style("fill", color_list[i]);
                    })

                    .on("mouseout", function(d) {  //Mouse event
                        art
                            .style("fill", "grey");
                    })
                    .on("click", function(){

                        //BEGIN ZOOM PROCESS
                        var i = +d3.select(this).attr('cluster');

                        //Handling mouse interactions
                        defaultInteractionFunctions.push([]);//'art');
                        defaultInteractionFunctions[0].push(art.on("mouseover"));art.on("mouseover",null);
                        defaultInteractionFunctions[0].push(art.on("mouseout"));art.on("mouseout",null);
                        defaultInteractionFunctions[0].push(art.on("click"));art.on("click",null);
                        defaultInteractionFunctions.push([]);//'artCenters');
                        defaultInteractionFunctions[1].push(artCenters.on("mouseover"));artCenters.on("mouseover",null);
                        defaultInteractionFunctions[1].push(artCenters.on("mouseout"));artCenters.on("mouseout",null);
                        defaultInteractionFunctions[1].push(artCenters.on("click"));artCenters.on("click",null);
                        art.filter(function(){ return d3.select(this).attr('cluster') == i; })
                            .each( function(){

                                d3.select(this)
                                    .on("mouseover", function(){  //Mouse event
                                        //
                                        //var matrix = this.getScreenCTM()
                                        //    .translate(+this.getAttribute("cx"),
                                        //        +this.getAttribute("cy")); //explanation at http://codepen.io/recursiev/pen/zpJxs

                                        var lat = d3.select(this).attr('lat');
                                        var lon = d3.select(this).attr('lon');
                                        var pixelPosInSVG = projection([lat,lon]);
                                        //var window_offset = $('#artSVG').offset().top - $(window).scrollTop();
                                        //console.log($('#cont').offset().left);
                                        myTool.html("<h5><b>" +
                                            "<p>Name: " +d3.select(this).attr('name')+"</p>" +
                                            "<p>Type: " +d3.select(this).attr('type')+"</p>" +
                                            "<p>Street: " +d3.select(this).attr('street')+"</p>" +
                                            "<p>Artist: " +d3.select(this).attr('artist')+"</p>" +
                                            "<p>Year: " + Math.floor(d3.select(this).attr('year'))+"</p>" +
                                            "<p>Description: " +d3.select(this).attr('description')+"</p>" +
                                            "<p>Geo Position: (" +lon+','+lat+")</p>" +
                                            "</b></h5>");
                                        tooltipDimensions = [myTool.node().offsetWidth,myTool.node().offsetHeight];
                                        var tooltipParentOffset = $('#'+tooltipID).parent().offset();
                                        var svgOffset =     $('#artSVG').offset();
                                        //console.log((window.pageXOffset + matrix.f - tooltipDimensions[1] - 10));
                                        //var pixelPos = projection([lat,lon]);
                                        d3.select(this)
                                        myTool
                                        /* .attr("transform", function(d, i) {
                                         return "translate(" + pixelPos + ")";
                                         })*/

                                            .style("left", ( svgOffset.left - tooltipParentOffset.left + pixelPosInSVG[0] - tooltipDimensions[0]/2)+"px") //window.pageXOffset + matrix.e - tooltipDimensions[0]/2
                                            .style("top",  ( 3050+svgOffset.top - tooltipParentOffset.top + pixelPosInSVG[1] - tooltipDimensions[1] - 10)+"px")//window.pageXOffset + matrix.f- tooltipDimensions[1] - 10
                                            .style("border", function(){
                                                return "solid "+color_list[i]; //HIGH Danger
                                            })

                                            .style("opacity", "1")
                                            .style("display", "block");  //The tooltip appears

                                    })
                                    .on("mouseout", function() {
                                        myTool.style("opacity", "0");
                                    });
                            })
                        ;
                        artCenters.filter(function(){ return d3.select(this).attr('cluster') == i; })
                            .each( function() {
                                d3.select(this)
                                    .on("mouseover", function(){  //Mouse event

                                        //var matrix = this.getScreenCTM()
                                        //    .translate(+this.getAttribute("cx"),
                                        //        +this.getAttribute("cy")); //explanation at http://codepen.io/recursiev/pen/zpJxs

                                        var lat = d3.select(this).attr('lat');
                                        var lon = d3.select(this).attr('lon');

                                        myTool.html("<h5><b>" +
                                            "<p>Cluster Center n° " +(i+1)+"</p>" +
                                            "<p>Geo Position: (" +lon+','+lat+")</p>" +
                                            "</b></h5>");
                                        tooltipDimensions = [myTool.node().offsetWidth,myTool.node().offsetHeight];


                                        var pixelPosInSVG = projection([lat,lon]);
                                        var tooltipParentOffset = $('#myArtTooltip').parent().offset();
                                        var svgOffset =     $('#artSVG').offset();

                                        d3.select(this)
                                        myTool
                                            .style("left", ( svgOffset.left - tooltipParentOffset.left + pixelPosInSVG[0] - tooltipDimensions[0]/2)+"px")
                                            .style("top",  ( 12750+svgOffset.top - tooltipParentOffset.top + pixelPosInSVG[1] - tooltipDimensions[1] - 10)+"px")
                                            .style("border", function(){
                                                return "solid "+color_list[i]; //HIGH Danger
                                            })
                                            .style("opacity", "1")
                                            .style("display", "block");  //The tooltip appears
                                    })
                                    .on("mouseout", function() {
                                        myTool.style("opacity", "0");
                                    });
                            });

                        //art.each(function(){console.log(1);});


                        //for each art of the clicked cluster, gather - longitude and latitude
                        var latValues = []; var lonValues = [];
                        filtered_art = art.filter(function(){ return +d3.select(this).attr('cluster') == i; });
                        filtered_art.each(function(){
                                //console.log(d3.select(this).attr('cluster'));
                                latValues.push(+d3.select(this).attr('lat')); // '+' sign to convert to numeric
                                lonValues.push(+d3.select(this).attr('lon'));
                            }
                        )
                        //calculate max and min of Latitude and Longitude of the points related to the same cluster
                        var lonMax = +d3.max(lonValues);
                        var lonMin = +d3.min(lonValues);
                        var latMax = +d3.max(latValues);
                        var latMin = +d3.min(latValues);
                        // console.log(lonMax,lonMin,latMax,latMin);
                        //console.log([(lonMax + lonMin) / 2 ,(latMax + latMin) / 2]);
                        var geoCentroid = [(latMax + latMin) / 2,(lonMax + lonMin) / 2];
                        var pixelCentroid = projection(geoCentroid);

                        //SCALE to fit all
                        var ZoomScale = 40;
                        var hscale = ZoomScale * w / (latMax - latMin);
                        var vscale = ZoomScale * h / (lonMax - lonMin);
                        ZoomScale = (hscale < vscale) ? hscale : vscale;
                        projection.scale(ZoomScale);
                        //TRANSLATION
                        //Set the center of the projection to the center of the bounding box:
                        projection.center(geoCentroid);//[(b[1][0] + b[0][0]) / 2, (b[1][1] + b[0][1]) / 2]);
                        //console.log(prevPixelCentroid);
                        //Use the translate method to move the center of the map to the center of the canvas:
                        projection.translate([w / 2, h / 2]);

                        //hide points just before zooming-in
                        art.style('opacity',0);
                        artCenters.style('opacity',0);

                        // Transition to the new projection.
                        svg.selectAll('path').transition()
                            .duration(750)
                            .attr("d", path);
                        /*

                         function changeCirclePosition(){
                         d3.select(this).attr("transform", function(d, i) {

                         var prevTransformString = d3.select(this).attr("transform");//.match('[\\+*\\-*[0-9]+\\.[0-9]+]');
                         var prevPixelCoords = [];
                         while ((myArray = myRe.exec(prevTransformString)) !== null) { //gets the X and Y data stored in translate
                         prevPixelCoords.push(+myArray[0]); //NOTE: the + converts to numeric !!
                         }
                         return "translate(" + [prevPixelCoords[0] - pixelCentroid[0] + prevPixelCentroid[0],prevPixelCoords[1] - pixelCentroid[1] + prevPixelCentroid[1]] + ")"; //Latitude, Longitude
                         //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
                         });
                         }
                         */

//update art position
                        art
                            .each( function(d) {//changeCirclePosition);
                                var lon = +d3.select(this).attr('lon');
                                var lat = +d3.select(this).attr('lat');
                                d3.select(this).attr("transform", "translate(" +projection([lat,lon])+")");
                            });

//update centers position
                        artCenters
                            .each( function(d) {//changeCirclePosition);
                                var lon = +d3.select(this).attr('lon');
                                var lat = +d3.select(this).attr('lat');
                                d3.select(this).attr("transform", "translate(" +projection([lat,lon])+")scale("+zoomedCentersIconScale+")");
                            });

//appearance of the points art while zoomed
                        art.filter(function(){ return d3.select(this).attr('cluster') == i; })
                            .style("fill", color_list[i]).attr("r",pointRadiusOnZoom).style("stroke-width", pointStrokeWidthOnZoom);
                        artCenters.filter(function(){ return d3.select(this).attr('cluster') != i; }).selectAll("rect").style("fill", "grey");/*.each(function(){
                         //console.log(d3.select(this).attr("lon"));
                         d3.select(this).select("rect").style("fill", "grey");
                         })*/

                        art.transition().duration(appearanceAnimationTime).delay(zoomAnimationTime).style('opacity',1);
                        artCenters.transition().duration(appearanceAnimationTime).delay(zoomAnimationTime).style('opacity',1);




                        prevPixelCentroid = pixelCentroid; //update the last centroid selected

                        //THE MAP IS ZOOMED

                        //adding interaction on click to the path to turn back to default view
                        svg.selectAll('path').on("click", function(){ //regionsPath
                            //console.log('Path clicked');
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
                            //hide points just before zooming-out
                            art.style('opacity',0);
                            artCenters.style('opacity',0);
                            // Transition to the Default projection.
                            svg.selectAll('path')
                                .transition()
                                .duration(zoomAnimationTime)
                                .attr("d", path)
                            ;

                            //update art position
                            art
                                .each( function(d) {
                                    var lon = +d3.select(this).attr('lon');
                                    var lat = +d3.select(this).attr('lat');
                                    d3.select(this).attr("transform", "translate(" +projection([lat,lon])+")");
                                })
                            ;
                            //update centers position
                            artCenters
                                .each( function(d) {
                                    var lon = +d3.select(this).attr('lon');
                                    var lat = +d3.select(this).attr('lat');
                                    d3.select(this).attr("transform", "translate(" +projection([lat,lon])+")scale("+centersIconScale+")");
                                });

                            //appearance of the points
                            art.filter(function(){ return d3.select(this).attr('cluster') == i; })
                                .style("fill", "grey").attr("r",pointRadius).style("stroke-width", pointStrokeWidth);
                            artCenters.selectAll("rect")//.filter(function(){ return d3.select(this).attr('cluster') != i; })
                                .style("fill", function(){ return color_list[d3.select(this.parentNode).attr('cluster')]});
                            art.transition().duration(appearanceAnimationTime).delay(zoomAnimationTime).style('opacity',1);
                            artCenters.transition().duration(appearanceAnimationTime).delay(zoomAnimationTime).style('opacity',1);


                            //THE MAP IS NOT ZOOMED ANYMORE
                            //Handling mouse interactions
                            svg.selectAll('path').on("click",null);
                            art.on("mouseover", defaultInteractionFunctions[0][0]);
                            art.on("mouseout", defaultInteractionFunctions[0][1]);
                            art.on("click", defaultInteractionFunctions[0][2]);
                            artCenters.on("mouseover", defaultInteractionFunctions[1][0]);
                            artCenters.on("mouseout", defaultInteractionFunctions[1][1]);
                            artCenters.on("click", defaultInteractionFunctions[1][2]);


                        })



                    })
                ;
                //adding icons to centers
                artCenters.each(function(d,i){
                    var group = d3.select(this);
                    group.attr("mask","url(#artymbolMask)");//.attr("transform","translate(300,300)scale(0.5)");

                    group.append("rect").attr("width",100).attr("height",100).attr("x",-50).attr("y",-50).style("fill",color_list[i]);
                    group.append("image").attr("xlink:href","artIcon.png").attr("width",70).attr("height",70).attr("transform","translate(-35,-35)");
                    group.append("circle").attr("r",47).attr("cx",0).attr("cy",0).attr("fill","transparent").attr("stroke","black").attr("stroke-width","8");
                })
                /*svg.append("circle").style("fill",'blue').attr("transform", function(d, i) {
                 return "translate(" + prevPixelCentroid + ")"; //d.slice(0,2)
                 //NOTE: Using projection object to translate from lon/lat to pixel coordinates!!
                 })
                 .attr("r", 30);*/
            });

        });

    });

}
