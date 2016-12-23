import L from 'leaflet'

let defaultBounds = [[0, -30], [60, 60]];
let defaultKeppBuffer = 20;

var MapBaseLayers = {
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
    name: 'Ancient World Mapping Center'
  },
  'OSM': {
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    className: 'map-base-layer map-base-layer-osm',
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    minZoom: 2,
    id: 'osm',
    maxZoom: 15,
    opacity: 1,
    bounds: defaultBounds,
    keepBuffer: defaultKeppBuffer,
    name: 'Open Street Maps'
  },

}

module.exports = MapBaseLayers
