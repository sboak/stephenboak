var current = [
  {name: "HTML",
  level: 4,
  description: "HTML5, Haml, ERB. I've been writing markup since 1993, and built my first website at  13."},
  {name: "CSS",
  level: 4,
  description: "CSS3, Sass, Frameworks (960, blueprint). I've got most properties and design patterns memorized."},
  {name: "Interface Design",
  level: 4,
  description: "Expert in Adobe Creative Suite. Expert knowledge of web interfaces and experiences."},
  {name: "Interaction Design",
  level: 4,
  description: "Omnigraffle, Wireframes, Workflows. I always research and document workflows before building them."},
  {name: "Javascript",
  level: 3,
  description: "solid jQuery knowledge and DOM manipulation, decent understanding of design patterns in JS."},
  {name: "Data Viz",
  level: 3,
  description: "D3, Google Maps API and Charts API, Google Earth, KML. My entire career, in some form, has been about bringing data to life."},
  {name: "Product Management",
  level: 3,
  description: "Managing tickets, deadlines, and client feedback"},
  {name: "Ruby",
  level: 2,
  description: "Sinatra, Rails. I can build solid mock back-ends for the systems I design."},
  {name: "MySQL",
  level: 2,
  description: "Good understanding of information architecture and relational database design."}
];

var past = [
  {name: "Parametric Modeling",
  level: 4,
  description: "CATIA, Revit, AutoCAD. Specialized in cost optimization and design-for-manufacturability, I saved almost $5M in the cost of facade production on the Beekman Tower."},
  {name: "GIS",
  level: 3,
  description: "Google Earth, ArcGIS, KML"},
  {name: "CNC Machining",
  level: 2,
  description: "G-Code, mills, lathes, routers"}
];

var w = 450,
    h = 230,
    x = d3.scale.linear().domain([0, 5]).range([0, w]),
    y = d3.scale.ordinal().domain(d3.range(current.length)).rangeBands([0, h], .2);
    
    var bubbleBox,
        bubbleShadow,
        bubbleLabel;

///////////////////////////////////////////////////////////
// CURRENT CHART //////////////////////////////////////////
///////////////////////////////////////////////////////////

var current_vis = d3.select("#current_chart");

current_vis.selectAll("div.bar").data(current).enter().append("div")
  .attr("class", "bar current")
  .style("width", function(d){
    return x(d.level) + "px";
  })
  .text(function(d){
    return d.name;
  })
  .attr("description", function(d){
    return d.description;
  });
  /*
  .text(function(d){
    var x = parseInt(d.level);
    if (x<1) {
      return "";
    } else if (x>=1 && x<2) {
      return "OK";
    } else if (x>=2 && x<3) {
      return "Good";
    } else if (x>=3 && x<4) {
      return "Skilled";
    } else {
      return "Expert";
    }
  });*/

///////////////////////////////////////////////////////////
// PAST CHART /////////////////////////////////////////////
///////////////////////////////////////////////////////////

var past_vis = d3.select("#past_chart");

past_vis.selectAll("div.bar").data(past).enter().append("div")
  .attr("class", "bar past")
  .style("width", function(d){
    return x(d.level) + "px";
  })
  .text(function(d){
    return d.name;
  })
  .attr("description", function(d){
    return d.description;
  });