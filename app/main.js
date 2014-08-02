(function(mapDiv) {
  var map;
  var baseLayer;
  var trailLayer;
  var parkCenter;

  var wgs84Projection = new OpenLayers.Projection("EPSG:4326");
  var osmFormat = new OpenLayers.Format.OSM();
  var fixedStrategy = new OpenLayers.Strategy.Fixed();

  var dataUrlFormat = "http://overpass-api.de/api/interpreter?data=[timeout:25];(node{0}{1};way{0}{1};relation{0}{1};);out body;>;out skel qt;";
  var parkBBox = "(35.06295226109525,-85.14790534973145,35.11653865167174,-85.07537841796875)";
  var trailTags = "[operator='Hamilton County'][highway=path]";
  var trailDataUrl = dataUrlFormat.replace(/\{0\}/g, trailTags).replace(/\{1\}/g, parkBBox);

  function setupMap() {
    map = new OpenLayers.Map(mapDiv);

    baseLayer = new OpenLayers.Layer.OSM();
    trailLayer = new OpenLayers.Layer.Vector("Trails", {
      styleMap: new OpenLayers.StyleMap({
        strokeColor: "#7627a7",
        strokeOpacity: 0.5,
        strokeWidth: 4,
        strokeLinecap: "butt",
        fillOpacity: 0
      }),
      strategies: [fixedStrategy],
      protocol: new OpenLayers.Protocol.HTTP({
        url: trailDataUrl,
        format: osmFormat
      }),
      projection: wgs84Projection
    });

    map.addLayers([baseLayer, trailLayer]);

    parkCenter = new OpenLayers.LonLat(-85.1152, 35.0890);
    parkCenter.transform(wgs84Projection, map.getProjectionObject());

    map.setCenter(parkCenter, 15);
  }

  setupMap();
})("map");
