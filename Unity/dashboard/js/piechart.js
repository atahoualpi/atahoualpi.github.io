var width =640,
    height = 333,
    radius = Math.min(width, height) / 2 ;

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .outerRadius(radius);

var pie = d3.layout.pie();
var val = [];
var data = [];
var sortVal;
var sorteight = [];
var arr = [];
var pltext;
var arcs;
var isClicked = {};
var arccolor = {};
var labels;
var outerRadius = Math.min(width, height) / 2,
       innerRadius = outerRadius * .999,   
       // for animation
       innerRadiusFinal = outerRadius * .5,
       innerRadiusFinal3 = outerRadius* .4;
// for animation
   var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
  var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);
// var data = d3.range(10).map(Math.random).sort(d3.descending);
// var data = [34,23]
d3.json("data/dataset.json", function(error, datatest) {
// console.log(typeof(data))
// console.log(Object.keys(datatest))
for (i in datatest){
  if(i.split("_")[0] == 'PLATFORM' && i.split("_")[1] != undefined){
    // console.log(i.split("_")[1]);
    // val.push({platform: i,value: datatest[i]});
    val.push({label: i,value: datatest[i]});
    // console.log(val)

  }
}

var temp = {};


for(var i in val){

  temp[val[i].label] = val[i].value;

}  
// console.log(val);
sortVal = Object.keys(temp).sort(function(a,b){return temp[a]-temp[b]})
sortVal = sortVal.reverse()
// console.log(sortVal)
for(var i=0;i<9;i++){
  sorteight.push(sortVal[i])
}
// console.log(sorteight)

var othercount = 0;
for (var i in val){
  if(sorteight.indexOf(val[i].label) < 0){
    othercount += val[i].value;
  }
}

// console.log(typeof(data))
for(var i in val){
  data.push(val[i].value)

}  
// console.log(val, typeof(val))
// console.log(data)

var maxVal = Math.max(...data);
// console.log(maxVal)
// for( i in val){
//   val[i].value /= maxVal;
// console.log(val[i].value)
// }  


// console.log(data)
var svg = d3.select(".divpie").append("svg")
      .datum(data)
      .attr("width", width)
      .attr("height", height)
      .attr("class", "piesvg")
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

   arcs = svg.selectAll("g.arc")
      .data(pie)
    .enter().append("g")
      .attr("class", "arc")
      
      .on("click", function(d){
        pltext = this.textContent;
        isClicked[pltext] = 1;

        if(arr.indexOf(pltext) > -1){
        }
        else{
          arr.push(pltext);
          showPics(pltext, arccolor);
        }

      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);


// showtext();

  arcs.append("path")
      .attr("fill", function(d, i) { 
        // arccolor[this.parentNode.textContent] = color(i);
        return color(i); })

      .transition()
      .ease("bounce")
      .duration(2000)
      .attrTween("d", tweenPie)
      .transition()
      .ease("elastic")
      .delay(function(d, i) { return 2000 + i * 50; })
      .duration(750)
      .attrTween("d", tweenDonut);
      // .each("end", showtext);

// d3.select("#textPlatf").remove();
showtext();
 arcs.append("path")
      .attr("fill", function(d, i) { 
        arccolor[this.parentNode.textContent] = color(i);
        return color(i); })

});

function showtext(){
// var text = arcs
//           .append("text")
//           .attr("class", "labels")
          
//           .attr("x", function(d){
//             var angle = (d.startAngle+d.endAngle)/2;
//             var pos;
//             if(angle >= Math.PI){
//               pos = -50+radius *Math.cos((d.startAngle+d.endAngle)/2-Math.PI/2);
//             }
//             else{
//               pos = 10+radius*Math.cos((d.startAngle+d.endAngle)/2-Math.PI/2);
//             }
//             return pos;
//           })
//           .attr("y",function(d,i){
//               return radius * Math.sin((d.startAngle+d.endAngle)/2-Math.PI/2);
//           })
//           .attr("opacity", 0);

//     text.data(val)
//     .text(function(d,i){
//             return d.label.split("_")[1];
//           })
//     .transition()
//           // .ease("bounce")
//           .duration(5000)
//           .attr("opacity", 1);

// Add a label to the larger arcs, translated to the arc centroid and rotated.
labels = arcs/*.filter(function(d) { return d.endAngle - d.startAngle > .2; })*/
        .append("svg:text")
        .attr("id", "textPlatf")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
        .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })

   labels.data(val)
        .text(function(d,i) {
        // console.log(d.label) 
       if(sorteight.indexOf(d.label) > -1){
          return d.label.split("_")[1];
       }
        else
          return "";
           })
        .transition()
          // .ease("bounce")
          .duration(4000)
          .attr("opacity", 1)

    }
    // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;

        return a > 90 ? a - 180 : a;
    }

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = radius * .5;
  var i = d3.interpolate({innerRadius: 0}, b);
  return function(t) { return arc(i(t)); };
}

function mouseover() {
    d3.select(this).select("path").transition()
        .duration(750)
              .attr("stroke","black")
              .attr("stroke-width", 1)
              .attr("d", arcFinal3)
              ;
  }
  
  function mouseout() {
    if (isClicked[this.textContent] != 1){
       d3.select(this).select("path").transition()
        .duration(750)
              // .attr("stroke","blue")
              .attr("stroke-width", 0)
              .attr("d", arcFinal);
    }
   
  }

  function removeanim(pltext){
    arcs.attr("opaci", function(d){
      if(this.textContent == pltext){
        console.log(this)
      
      d3.select(this).select("path").transition()
        .duration(750)
              // .attr("stroke","blue")
              .attr("stroke-width", 0)
              .attr("d", arcFinal);
            }
    })
  }