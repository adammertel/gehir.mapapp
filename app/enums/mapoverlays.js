import L from 'leaflet'
import ne_50m from '../data/ne_50m_admin'

let defaultBounds = [[0, -30], [60, 60]]
let defaultKeppBuffer = 20

var MapOverlays = {
  'COUNTRIES_MODERN': {
    id: 'countries_modern',
    json: ne_50m,
    name: 'modern countries',
    type: 'geojson',
    info: 'blablabla',
  },
  'ROADS': {
    id: 'roads',
    name: 'roads of Roman Empire',
    url: 'http://awmc.unc.edu/cgi-bin/mapserv?map=/awmc-stor/html/awmc/mapfiles/a_la_carte_framework_web_mercator_wms.map',
    layers: 'roads_m',
    format: 'image/png',
    transparent: true,
    attribution: 'awmc',
    type: 'wms',
    info: 'blablabla',
  },
  'ROME_60': {
    id: 'rome60',
    name: 'Roman Empire extent 60',
    url: 'http://awmc.unc.edu/cgi-bin/mapserv?map=/awmc-stor/html/awmc/mapfiles/a_la_carte_framework_web_mercator_wms.map',
    layers: 'rome_60',
    format: 'image/png',
    transparent: true,
    attribution: 'awmc',
    type: 'wms',
    info: 'blablabla',
  },
  'ROME_117': {
    id: 'rome117',
    name: 'Roman Empire extent 117',
    url: 'http://awmc.unc.edu/cgi-bin/mapserv?map=/awmc-stor/html/awmc/mapfiles/a_la_carte_framework_web_mercator_wms.map',
    layers: 'rome_117',
    format: 'image/png',
    transparent: true,
    attribution: 'awmc',
    type: 'wms',
    info: 'blablabla',
  },
  'ROME_PROVINCES': {
    id: 'rome_provinces',
    name: 'Roman Provinces, boundaries',
    url: 'http://awmc.unc.edu/cgi-bin/mapserv?map=/awmc-stor/html/awmc/mapfiles/a_la_carte_framework_web_mercator_wms.map',
    layers: 'roman_provinces',
    format: 'image/png',
    transparent: true,
    attribution: 'awmc',
    type: 'wms',
    info: 'blablabla',
  },
}

module.exports = MapOverlays
