import L from 'leaflet'

let defaultBounds = [[0, -30], [60, 60]];
let defaultKeppBuffer = 20;

var MapBaseLayers = {
  'IMPERIUM': {
    url: 'http://pelagios.org/tilesets/imperium/{z}/{x}/{y}.png',
    className: 'map-base-layer map-base-layer-osm',
    attribution: '<a href="http://dare.ht.lu.se/">Digital Atlas of the Roman Empire (DARE)</a>',
    minZoom: 2,
    id: 'imperium',
    maxZoom: 11,
    opacity: 1,
    bounds: defaultBounds,
    keepBuffer: defaultKeppBuffer,
    name: 'Imperium',
    info: 'http://dare.ht.lu.se/',
  },

  'AWMC': {
    url: 'http://a.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png',
    className: 'map-base-layer map-base-layer-awmc',
    attribution: 'awmc',
    id: 'awmc',
    minZoom: 2,
    maxZoom: 15,
    opacity: 1,
    bounds: defaultBounds,
    keepBuffer: defaultKeppBuffer,
    name: 'AWMC',
    info: 'Ancient World Mapping Center',
  },

  'OSM': {
    url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    className: 'map-base-layer map-base-layer-osm',
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    minZoom: 2,
    id: 'osm',
    maxZoom: 15,
    opacity: 1,
    bounds: defaultBounds,
    keepBuffer: defaultKeppBuffer,
    name: 'Open Street Maps',
    info: 'http://openstreetmap.org',
  },

  'ESRIWORLD': {
    url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
	  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    id: 'esri',
    name: 'WorldImagery ESRI',
    info: 'WorldImagery ESRI ArcGIS Online WMS',
  }

}

module.exports = MapBaseLayers
