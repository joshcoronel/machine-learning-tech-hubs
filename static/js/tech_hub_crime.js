///////////////////////////////DROP DOWN SELECTOR FOR PANNING////////////////////////

function BuildDropDown() {
    var selection = d3.select("#selDataset")
    selection.append("option")
        .text(name)
        .attr("value", name)
  }
  
  function optionChanged(selection) {
    map.panTo(coordinates[selection])
  }

  //Top 20 Tech Hubs based on data from CompTIA 
coordinates = {
    "Austin, TX": [30.2672,-97.7431],
    "Dallas, TX":[32.7762719,-96.7968559],
    "Raleigh, NC":[35.7803977,-78.6390989],
    "San Jose, CA":[37.3361905,-121.890583],
    "Charlotte, NC":[35.2272086,-80.8430827],
    "Seattle, WA":[47.6038321,-122.3300624],
    "San Francisco, CA":[37.7749,-122.4194],
    "Atlanta, GA":[33.7489924,-84.3902644],
    "Huntsville, AL":[34.729847,-86.5859011],
    "Denver, CO":[39.7392364,-104.9848623],
    "New York, NY":[40.7127281,-74.0060152],
    "Boston, MA":[42.3602534,-71.0582912],
    "Trenton, NJ":[40.2170575,-74.7429463],
  };

////////////////////////MAP CONTAINER///////////////////////////////////////////////
function default_map(coordinates) {

    var map = L.map("map", {
        center: coordinates,
        zoom: 11
    });
  
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 20,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
    }).addTo(map);
    return map
  }

var map = default_map(coordinates["San Francisco, CA"])

///////////////////////////////CHLOROPLETH LAYER///////////////////////////////////


/////////////////////////////////LAYER CONTROL/////////////////////////////////////

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 20,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA" ///////////////DONT FORGET TO GET RID OF THIS
}).addTo(map);


var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
});

var standard = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 20,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
});

// Only one base layer can be shown at a time
var baseMaps = {
    Day: standard,
    Night: dark,
};
// overlays.addTo(map);
//Overlays that may be toggled on or off
var overlayMaps = {
    //'Real Estate Prices': geojson,
    //'Crime Data': overlays
};
L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

