var esri = {};
var emaps={streets:"http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",satellite:"http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",hybrid:"http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",topo:"http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",gray:"http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",oceans:"http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}","national-geographic":"http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",osm:"http://tile.openstreetmap.org/{z}/{x}/{y}.png"};
L.Map.prototype.centerAndZoom = function(c, z) {
    this.setView(c.reverse(), z);
};
L.Map.prototype.setBasemap = function(x) { this.removeLayer(this.b); this.b = l(x).addTo(this); };
var l = function(x) { return new L.TileLayer(emaps[x]) };
esri.Map = function(e, o) {
    o.center && (o.center = o.center.reverse());
    var m = new L.Map(e, o);
    o.basemap && (m.b = l(o.basemap).addTo(m));
    return m;
};

var index, mapLocations, timerHandle, map;

function init() {
  // Create map
  var options = {
    basemap: "gray",
    center: [-100, 50],
    zoom: 3
  };
  map = new esri.Map("mapDiv",options);
  initBasemaps();
}

function initBasemaps() {
  index = 0;
  // Setup map locations
  mapLocations = [
    ["gray",[-100,45],3], // World
    ["streets",[-0.13,51.50],11], // London
    ["hybrid",[151.21,-33.87],14], // Sydney
    ["topo",[-77.017,38.943],17], // D.C.
    ["national-geographic",[-84.0,10],9], // Costa Rica
    ["oceans",[-40,30],4], // Atlantic
    ["gray",[135,-25],4], // Australia
    ["streets",[-117.20,32.73],13], // San Diego
    ["hybrid",[-77.65,24.20],9], // Bahamas
    ["topo",[139.75,35.69],17], // Tokyo
    ["national-geographic",[-74,40.74],12], // New York
    ["oceans",[-160,30],3] // Pacific
  ];
 }

function setBasemap(type) {
	// Disable playmode
	document.getElementById("tour").checked = false;
	clearInterval(timerHandle);
	map.setBasemap(type);
}

function showBasemap(index,moveLocation) {
	// set map and location
	map.setBasemap(mapLocations[index][0]);
	if (moveLocation)
		map.centerAndZoom(mapLocations[index][1],mapLocations[index][2]);
}

function move(forward) {
	var i = index;
	if (forward)
		index = index < (mapLocations.length - 1) ? (index + 1) : index;
	else
		index = index > 0 ? (index - 1) : 0;
	if (i != index)
		showBasemap(index,true);
}

function playTour() {
	if (document.getElementById("tour").checked) {
		// Start immediately
		setTimeout(function() {
			index = (index < (mapLocations.length - 1) ? (index + 1) : 0);
			showBasemap(index,true);
			},700);
		// Start timer
		timerHandle = setInterval ( function () {
			if (map.loaded) {
				index = (index < (mapLocations.length - 1) ? (index + 1) : 0);
				showBasemap(index, true);
			}
		}, 5000 );
	} else {
		clearInterval(timerHandle);
	}
}

function setStyle(elementName, className) {
		var element = document.getElementById(elementName);
		if (element) element.className = className;
}

init();
