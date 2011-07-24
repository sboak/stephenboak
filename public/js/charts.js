var current = [
  {name: "HTML",
  level: 4,
  description: "HTML5, Haml, ERB"},
  {name: "CSS",
  level: 4,
  description: "CSS3, Sass, Frameworks (960, blueprint)"},
  {name: "Interface Design",
  level: 4,
  description: "Photoshop, Illustrator"},
  {name: "Interaction Design",
  level: 3,
  description: "Omnigraffle, Wireframes, Workflows"},
  {name: "Javascript",
  level: 3,
  description: "jQuery, but not needed"},
  {name: "Data Viz",
  level: 3,
  description: "D3, Google Maps API and Charts API, Google Earth, KML"},
  {name: "Product Management",
  level: 3,
  description: "Tickets, deadlines, and client feedback"},
  {name: "Ruby",
  level: 2,
  description: "Sinatra, Rails"},
  {name: "MySQL",
  level: 2,
  description: "Good understanding of information architecture"}
];

var past = [
  {name: "Parametric Modeling",
  level: 4,
  description: "CATIA, Revit, AutoCAD"},
  {name: "GIS",
  level: 3,
  description: "Google Earth, ArcGIS, KML"},
  {name: "CNC Machining",
  level: 2,
  description: "G-Code, mills, lathes, routers"}
];

var w = 400,
    h = 230,
    offset = 160,
    x = d3.scale.linear().domain([0, 5]).range([0, w - offset]),
    y = d3.scale.ordinal().domain(d3.range(current.length)).rangeBands([0, h], .2);
    
    var bubbleBox,
        bubbleShadow,
        bubbleLabel;

///////////////////////////////////////////////////////////
// CURRENT CHART //////////////////////////////////////////
///////////////////////////////////////////////////////////

var current_vis = d3.select("#current_chart")
  .append("svg:svg")
  .attr("width", w)
  .attr("height", h + 20)
  .append("svg:g")
  .attr("transform", "translate(" + offset + ",0)")
  .on("mouseout", clearBubble());;

//CREATE GROUPS
var rules = current_vis.selectAll("g.rule")
  .data(d3.range(0,5))
  .enter().append("svg:g")
  .attr("class", "rules")
  .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
var bars = current_vis.selectAll("g.bars")
  .data(current)
  .enter().append("svg:g")
  .attr("class", "bars")
  .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });
var labels = current_vis.selectAll("g.labels")
  .data(current)
  .enter().append("svg:g")
  .attr("class", "labels")
  .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });
var bubbleGroup= current_vis.append("svg:g").attr("class", "bubble");

rules.append("svg:line")
  .attr("y1", 0)
  .attr("y2", h+2)
  .attr("stroke", "gray");

rules.append("svg:text")
  .attr("y", h + 9)
  .attr("dy", ".5em")
  .text(function(d){
    var x = parseInt(d);
    if (x<1) {
      return "None";
    } else if (x>=1 && x<2) {
      return "OK";
    } else if (x>=2 && x<3) {
      return "Good";
    } else if (x>=3 && x<4) {
      return "Skilled";
    } else {
      return "Expert";
    }
  });

bars.append("svg:rect")
  .attr("width", function(d){
    return x(d.level);
  })
  .attr("height", y.rangeBand())
  .on("mouseover", function(d){
    drawBubble(d.description);
  })
  .on("mousemove", moveBubble())
  .on("mouseout", clearBubble());

labels.append("svg:text")
  .attr("x", x)
  .attr("y", y.rangeBand() / 2)
  .attr("dx", -6)
  .attr("dy", ".35em")
  .text(function(d){
    return d.name;
  });


///////////////////////////////////////////////////////////
// PAST CHART /////////////////////////////////////////////
///////////////////////////////////////////////////////////


h = 90;
y = d3.scale.ordinal().domain(d3.range(past.length)).rangeBands([0, h], .2);

var past_vis = d3.select("#past_chart")
  .append("svg:svg")
  .attr("width", w)
  .attr("height", h + 20)
  .append("svg:g")
  .attr("transform", "translate(" + offset + ",0)");

//CREATE GROUPS
var rules = past_vis.selectAll("g.rule")
  .data(d3.range(0,5))
  .enter().append("svg:g")
  .attr("class", "rules")
  .attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
var bars = past_vis.selectAll("g.bars")
  .data(past)
  .enter().append("svg:g")
  .attr("class", "bars")
  .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i) + ")"; });
var labels = past_vis.selectAll("g.labels")
  .data(past)
  .enter().append("svg:g")
  .attr("class", "labels")
  .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

rules.append("svg:line")
  .attr("y1", 0)
  .attr("y2", h+2)
  .attr("stroke", "gray");

rules.append("svg:text")
  .attr("y", h + 9)
  .attr("dy", ".5em")
  .text(function(d){
    var x = parseInt(d);
    if (x<1) {
      return "None";
    } else if (x>=1 && x<2) {
      return "OK";
    } else if (x>=2 && x<3) {
      return "Good";
    } else if (x>=3 && x<4) {
      return "Skilled";
    } else {
      return "Expert";
    }
  });

bars.append("svg:rect")
  .attr("width", function(d){
    return x(d.level);
  })
  .attr("height", y.rangeBand());

labels.append("svg:text")
  .attr("x", x)
  .attr("y", y.rangeBand() / 2)
  .attr("dx", -6)
  .attr("dy", ".35em")
  .text(function(d){
    return d.name;
  });


///////////////////////////////////////////////////////////
// FUNCTIONS //////////////////////////////////////////////
///////////////////////////////////////////////////////////

function drawBubble(description) {
  clearBubble();
  bubbleBox = bubbleGroup.append("svg:rect").attr("class", "bubbleBox").attr("width", 200).attr("height", 25);
  bubbleLabel = bubbleGroup.append("svg:text")
    .attr("class", "bubbleValue")
    .attr("dx",5)
    .attr("dy",18)
    .attr("height",100)
    .attr("width", 200)
    .text(description);
}

function moveBubble() {
  return function(d) {
    bubbleGroup.attr("transform", function() { return "translate(" +[d3.svg.mouse(this.parentNode)[0]+3,d3.svg.mouse(this.parentNode)[1]-27] + ")"; });
  }
}

function clearBubble() {
  if (bubbleGroup) {
    bubbleGroup.selectAll("rect").remove();
    bubbleGroup.selectAll("text").remove();
    bubbleLabel = undefined;
  }
}