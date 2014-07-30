(function(mapDiv) {
  var map;
  var baseLayer;
  var trailLayer;
  var parkCenter;
  
  function setupMap() {
    map = new OpenLayers.Map(mapDiv);
	
    baseLayer = new OpenLayers.Layer.OSM();
    trailLayer = new OpenLayers.Layer.Vector("Trails", {
      styleMap: new OpenLayers.StyleMap({
	    strokeColor: "#7627a7",
	    strokeOpacity: 0.3,
	    strokeWidth: 2,
	    strokeLinecap: "butt",
	    fillColor: "#7627a7",
	    fillOpacity: 0.3
	  })
	});
	
	map.addLayers([baseLayer, trailLayer]);
	
	parkCenter = new OpenLayers.LonLat(-85.1152, 35.0890);
	parkCenter.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
	
    map.setCenter(parkCenter, 15);
  }

  setupMap();
})("map");