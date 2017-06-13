import L from 'leaflet'
import React from 'react'
import turf from 'turf'
import dissolve from '@turf/dissolve'
import { Map, LayerGroup, TileLayer, WMSTileLayer, GeoJSON } from 'react-leaflet'

import Base from '../base'

import Actions from '../enums/actions'
import Styles from '../enums/styles'
import MapTopics from '../enums/maptopics'
import MapBaseLayers from '../enums/mapbaselayers.js'
import MapOverlays from '../enums/mapoverlays.js'
import 'leaflet-semicircle'
import 'leaflet-carousel'
import 'leaflet-regular-grid-cluster'


export default class MapContainer extends React.Component {

    componentDidMount () {
      this.lEl = this.refs.map.leafletElement
      this.lastTopic = appState.activeMapTopic
      window['map'] = this.lEl
      L.Util.setOptions(map, {maxBoundsViscosity: 1})

      this.dataLayers = [];

      this.afterRender()
      this.topicChanged()
    }

    componentDidUpdate () {
      this.afterRender()
    }

    afterRender () {
      if (this.lastTopic != this.props.appState.activeMapTopic) {
        this.lastTopic = this.props.appState.activeMapTopic
        this.topicChanged()
      }
      if (window['newwRefreshMap']){
        this.topicChanged()
        window['newwRefreshMap'] = false
      } 
    }

    topicChanged () {
      this.visualiseTopic()
    }

    refreshMapTiles () {
      let that = this;

      Object.keys(this.props.appState.MapBaseLayers).map(function(mapTileKey) {
        let mapTile = that.props.appState.MapBaseLayers[mapTileKey];
        if (mapTile.active) {
          mapTile.layer.addTo(that.map);
        } else {
          mapTile.layer.remove();
        }
      })
    }

    refresh () {
      this.map.setView(
        Base.getActiveMapTopic().originLatLng,
        Base.getActiveMapTopic().originZoom
      );

      this.refreshMapTiles();
    }

    moveEndHandle () {
      var centerLL = this.lEl.getCenter();
      dispatcher.dispatch(Actions['MAP_CHANGE_CENTER'], {newMapCenter: centerLL})
    }

    zoomEndHandle () {
      var zoom = this.lEl.getZoom();
      dispatcher.dispatch(Actions['MAP_CHANGE_ZOOM'], {newMapZoom: zoom})
    }

    renderBaseLayers () {
      let baseLayers = []
      let context = this.props.appState

      Object.keys(MapBaseLayers).map(function(mapTileKey, mapIndex) {
        let mapTile = MapBaseLayers[mapTileKey]

        if (mapTile.id === context.activeBaseLayer) {
          baseLayers.push(
            <TileLayer 
              key={mapIndex}
              url={mapTile.url}
              zIndex={1}
              opacity={mapTile.opacity}
              className={mapTile.className}
            />
          )
        }
      })
      return baseLayers;
    }

    renderOverlays () {
      let overlayLayers = []
      let context = this.props.appState

      Object.keys(MapOverlays).map(function(mapOverlayKey, mapIndex) {
        let mapOverlay = MapOverlays[mapOverlayKey]

        if (context.activeOverlays.indexOf(mapOverlay.id) != -1) {
          if (mapOverlay.type == 'wms') {

            overlayLayers.push(
              <WMSTileLayer 
                url={mapOverlay.url}
                key={mapIndex}
                layers={mapOverlay.layers}
                format={mapOverlay.format}
                opacity={mapOverlay.opacity}
                transparent={mapOverlay.transparent}
                attribution={mapOverlay.attribution}
                zIndex={2}
              />
            )
          }
          if (mapOverlay.type == 'geojson') {
            overlayLayers.push(
              <GeoJSON 
                data={mapOverlay.json.ne_50m}
                key={mapIndex}
                style={
                  {
                    fill: false,
                    weight: 1,
                    color: 'black'
                  }
                }
              />
            )
          }
        }
      })
      return overlayLayers;
    }

    render () {
      var that = this

      return (
        <div className='map-wrapper' style={Styles['MAP_WRAPPER'](this.props.appState.infoOpen)}>
          <Map
            ref="map" 
            minZoom={2}
            maxBounds={[[10, -30], [60, 60]]}
            maxZoom={11} 
            center={appState.mapCenter}
            style={Styles['MAP']()}
            zoom={appState.mapZoom}
            onMoveEnd={this.moveEndHandle.bind(this)}
            onZoomEnd={this.zoomEndHandle.bind(this)}
          >
            <LayerGroup>
              { this.renderBaseLayers() }
            </LayerGroup>
            <LayerGroup>
              { this.renderOverlays() }
            </LayerGroup>
          </Map>
        </div>
      )
    }


    drawLayers () {
      this.dataLayers.map(layer => layer.addTo(map));
    }

    clearDataLayer () {
      this.dataLayers.map(layer => {
        if (layer.unregister) {
          layer.unregister()
        }
        layer.clearLayers()

        map.removeLayer(layer)
      })
      this.dataLayers = []
    }

    visualiseTopic () {
      const topic = this.props.appState.activeMapTopic
      this.clearDataLayer()

      const t1 = Base.now()
      
      switch (topic) {

        case MapTopics['ISIS'].label:
          this.visualiseIsis()
          break

        case MapTopics['MARLUC'].label:
          this.visualiseMarluc()
          break

        case MapTopics['CHRISTROME'].label:
          this.visualiseChristrome()
          break

        case MapTopics['MITHORIG'].label:
          this.visualiseMithorig()
          break
        }

        this.drawLayers()

        // time
        console.log('')
        console.log('topic', topic, 'drawn after', (Base.now() - t1), 'ms')
        console.log('')
    }


    /*
      ISIS TOPIC
    */
    visualiseIsis () {
      const isisColors = {
        'Isis': '#377eb8',
        'Sarapis': '#4daf4a',
        'Apis': '#e41a1c',
        'Anubis': '#e41a1c',
        'Osiris': '#e41a1c',
        'Horus': '#e41a1c',
        'Arsinoe II': '#e41a1c',
        'Harpocrates': '#e41a1c',
      }

      const isisOptions = {
        circleSegmentAngle: 20,
        colors: isisColors,
        propertyName: 'deities',
        opacityDecrease: appState.controlOptions.isis.opacityDecrease
      }

      // temples
      const templeOptions = Object.assign(isisOptions, {
        maxDist: appState.controlOptions.isis.templeDistance,
        noSteps:  parseInt(appState.controlOptions.isis.templeDistance / 20000) + 1,
      })
      const temples = L.carouselMarkerGroup(templeOptions)
      const templesJson = L.geoJSON(data.isis_temples)
      const templeLayers = templesJson.getLayers()

      temples.addLayers(templeLayers)

      // artefacts
      const artefactsOptions = Object.assign(isisOptions, {
        maxDist: appState.controlOptions.isis.artefactDistance,
        noSteps: parseInt(appState.controlOptions.isis.artefactDistance / 20000) + 1,
      })
      const artefacts = L.carouselMarkerGroup(artefactsOptions)
      const artefactsJson = L.geoJSON(data.isis_artefacts)
      const artefactLayers = artefactsJson.getLayers()

      artefacts.addLayers(artefactLayers)
      
      this.dataLayers.push(artefacts)
      this.dataLayers.push(temples)

      const isis_points = []
      data.isis_artefacts.features.filter(artefact => artefact.geometry && artefact.properties.deities.length).map( artefact => {
        const isThere = isis_points.find( point => point.cs[0] === artefact.geometry.coordinates[0])
        const item = {type: 'artefact', label: artefact.properties.label, deities: artefact.properties.deities}
        isThere ? isThere.items.push(item) : isis_points.push({items: [item], cs: artefact.geometry.coordinates})
      })

      data.isis_temples.features.filter(temple => temple.geometry && temple.properties.deities.length).map( temple => {
        const isThere = isis_points.find( point => point.cs[0] === temple.geometry.coordinates[0])
        const item = {type: 'temple', label: temple.properties.label, deities: temple.properties.deities}
        isThere ? isThere.items.push(item) : isis_points.push({ items: [item], cs: temple.geometry.coordinates})
      })

      this.dataLayers.push(
        L.featureGroup(
          isis_points.map(point => {
            return L.circleMarker([point.cs[1], point.cs[0]], {radius: 1.2 + point.items.length * 0.3, className: 'map-isis'})
              .bindTooltip(point.items.map( item => {
                return item.type + 
                  ' <b>' + item.label + '</b>' + 
                  ' (' + item.deities.join() + ')'
              }).join('<br/ >'))
          })   
        )
      )
    }



    /* 
      CHRISTROME TOPIC
    */
    visualiseChristrome() {

      const churchesGroups = [
        {
          id: 3,
          time: [313],
          items: [],
          color: '#f03b20'
        },
        {
          id: 2,
          time: [350],
          items: [],
          color: '#feb24c'
        },
        {
          id: 1,
          time: [800],
          items: [],
          color: '#ffeda0'
        },
        {
          id: 0,
          time: [],
          items: [],
          color: 'lightgrey'
        }
      ]

      const time1 = Base.now()
      const regions = Object.assign({}, data.regions)
      data.churches.features.map(church => {
        const date = church.properties.date
        church.properties.time = 0
        if (date) {
          churchesGroups.filter(g => g.id !== 0).map(group => {
            if (group.time > date) {
              church.properties.time = Math.max(...[church.properties.time, group.id])
              church.geometry ? group.items.push(church) : null;
            }
          })
        }
      })

      const time2 = Base.now()
      //console.log(time2 - time1, 'ms to FILTER CHURCHES')
      churchesGroups.filter(g => g.id !== 0).map(group => {
        const fc = turf.featureCollection(group.items)
        
        group.buffer = turf.simplify(dissolve(turf.buffer(fc, appState.controlOptions.christrome.churchRadius, 'kilometers')), 0.1)
        group.buffer.features.map(buffer => buffer.bounds = L.geoJSON(buffer).getBounds())
      })

      const time3 = Base.now()
      //console.log(time3 - time2, 'ms to BUFFER CHURCHES')
      regions.features.map(region => {
        region.properties.time = 0;
        const regionBbox = L.geoJSON(region).getBounds()

        churchesGroups.filter(g => g.id !== 0).map(group => {
          const intersects = group.buffer.features.find(buffer => {
            return buffer.bounds.intersects(regionBbox) && !!(turf.intersect(buffer, region))
          })
          if (intersects) {
            region.properties.time = Math.max(...[region.properties.time, group.id])
          }
        })
      })

      const time4 = Base.now()
      //console.log(time4 - time3, 'ms to ASSIGN BUFFERS')

      // drawing regions
      if (appState.controlOptions.christrome.mode === 'regions') {
        this.dataLayers.push(
          L.geoJSON(regions, {
            style: (region) => {
              const color = churchesGroups.find(g => g.id === region.properties.time).color
              return {
                opacity: 1, 
                fillOpacity: .6, 
                weight: .5, 
                color: 'white', 
                fillColor: color
              }
            }
          }).bindPopup( layer => '<div><span>region:<span><b>' + layer.feature.properties.n + '<b></div>')
        )
      }



      const time5 = Base.now()

      // drawing radii
      if (appState.controlOptions.christrome.mode === 'radii') {
        churchesGroups.filter(g => g.id !== 0).reverse().map(group => {
          this.dataLayers.push(
            L.geoJSON(
              group.buffer, {
                fillOpacity: 0.4, 
                color: group.color, 
                fillColor: group.color,
                weight: .5
              }
            )
          )
        })
      }

      // drawing churches
      const uniqueChurches = []
      
      data.churches.features.filter(ch => ch.geometry && ch.properties.date).map(church => {
        const cs = church.geometry.coordinates
        const isThere = uniqueChurches.find(uch => uch.cs[0] === cs[0])
        isThere ? isThere.items.push(church.properties) : uniqueChurches.push({cs: cs, items:[church.properties]})
      })

      this.dataLayers.push(
        L.featureGroup(
          uniqueChurches.map( church => {
            return L.circleMarker([church.cs[1], church.cs[0]], {radius: 1.2 + church.items.length * 0.1, className: 'map-churches'})
              .bindTooltip(church.items.map( item => 'church <b>' + item.n + '</b> (' + item.date + ')').join('<br/ >'))
          })   
        )
      )

      console.log(time5 - time4, 'ms to DRAW REGIONS')
    }



    /* 
      MARLUC TOPIC
    */
    visualiseMarluc() {
      const synagogueRules = {
        markers: {
            "radius": {
                "method": "count",
                "attribute": "",
                "scale": "continuous",
                "domain": [1, 20],
                "range": [5, 15]
            },
            "fillOpacity": .7,
            "weight": 1,
            "color": "black",
            "fillColor": {
                "method": "min",
                "attribute": "date",
                "scale": "size",
                "domain": [-200, 400],
                "range": ['#feb24c','#fd8d3c','#f03b20','#bd0026']
            },
        }
      }
      const congregatesRules = {
        cells: {
            "fillColor": {
                "method": "count",
                "attribute": "",
                "scale": "size",
                "range": ['#bdc9e1','#67a9cf','#1c9099','#016c59']
            },
            "fillOpacity": 0.35,
            "weight": 1,
            "color": 'white'
        },
      }

      const marlucOptions = {
          gridMode: 'square',
          showTexts: false,
          showMarkers: false,
          showCells: false,
          zoomShowElements: 7,
          gridOrigin: {lat: 20, lng: -10},
          zoomHideGrid: 7,
          zoneSize: 6000,
      }

      const congregatesGrid = L.regularGridCluster( 
        Object.assign(marlucOptions, {showCells: true, rules: congregatesRules})
      );

      const synagogueGrid = L.regularGridCluster( 
        Object.assign(marlucOptions, {showMarkers: true, rules: synagogueRules})
      );

      const synagoguePoints = data.synagogues.features.filter(synagogue => {
        const date = synagogue.properties.date
        return appState.controlOptions.marluc.synagogueDateBefore > date && appState.controlOptions.marluc.synagogueDateAfter < date
      }).map( synagogue => {
        return {
          marker: 
            L.circleMarker(
              turf.flip(synagogue.geometry).coordinates, 
              {radius: 4, className: 'map-synagogues'}
            ).bindTooltip(
              'synagogue <b>' + synagogue.properties.n + '</b> (' + synagogue.properties.date + ')'
            ),
          properties: {date: synagogue.properties.date}
        }
      })

      const congregatesPoints = data.congregates.features.map( congregate => {
        return {
          marker: 
            L.circleMarker(
              turf.flip(congregate.geometry).coordinates, 
              {radius: 3, className: 'map-congregates'}
            ).bindTooltip(
              'christian congregation <b>' + congregate.properties.n + '</b>'
            ),
          properties: {}
        }
      })

      congregatesGrid.addLayers(congregatesPoints)
      synagogueGrid.addLayers(synagoguePoints)
      this.dataLayers.push(synagogueGrid)
      this.dataLayers.push(congregatesGrid)
    }



    /* 
      MITHORIG TOPIC
    */
    visualiseMithorig() {

      const mithraicColors = ['#d7191c','#fdae61','#a6d96a','#1a9641']
      // forts
      const fortRules = {
        cells: {
            "fillColor": {
                "method": "count",
                "attribute": "",
                "scale": "quantile",
                "range": ['#cbc9e2','#9e9ac8','#756bb1','#54278f']
            },
            "fillOpacity": 0.35,
            "weight": 0
        }
      }

      const mithreaRules = {
        markers: {
          "radius": {
              "method": "count",
              "attribute": "",
              "scale": "continuous",
              "range": [3,8],
              "domain": [0, 15],
          },
          "color": 'black',
          "weight": 1,
          "fillOpacity": 0.8,
          "fillColor": {
              "method": "mean",
              "attribute": "p",
              "scale": "size",
              "domain": [-0.1, 1.1],
              "range": mithraicColors
          }
        }
      }

      const gridOptions = {
          gridMode: 'hexagon',
          showTexts: false,
          showMarkers: false,
          showCells: false,
          zoomShowElements: 7,
          gridOrigin: {lat: 20, lng: -10},
          zoomHideGrid: 7,
          zoneSize: appState.controlOptions.mithorig.gridSize,
      }

      const fortGrid = L.regularGridCluster( 
        Object.assign(gridOptions, {showCells: true, rules: fortRules})
      );

      // drawing forts
      const uniqueForts = []
      const fortDistanceThreshold = 10000

      data.forts.features.filter(f => f.geometry).map(fort => {
        const cs = L.latLng(fort.geometry.coordinates[1], fort.geometry.coordinates[0])
        const isThere = uniqueForts.find(uf => uf.cs.distanceTo(cs) < fortDistanceThreshold)
        isThere ? isThere.items.push(fort.properties) : uniqueForts.push({cs: cs, items:[fort.properties]})
      })

      const fortPoints = uniqueForts.map( fort => {
        return {
          marker: 
            L.circleMarker(
              fort.cs, 
              {radius: 1.2 + fort.items.length * 0.2, className: 'map-forts'}
            ).bindTooltip(fort.items.map( item => 'fort <b>' + item.n + '</b>').join('<br/ >')),
          properties: {}
        }
      })

      fortGrid.addLayers(fortPoints)
      this.dataLayers.push(fortGrid)

      // mithrea
      const mithraeaGrid = L.regularGridCluster(
        Object.assign(gridOptions, {showMarkers: true, rules: mithreaRules})
      );

      const weightProbability = (probabilities) => {
        const weights = probabilities.map(pr => {
          if (pr === 'definitive') return 1
          else if (pr === 'probable') return 0.5
          else if (pr === 'dubious') return 0
          else return 0
        })

        return Base.average(weights)
      }
      const colorProbability = (probabilities) => {
        const avgWeight = weightProbability(probabilities)
        if (avgWeight > 0.66) return mithraicColors[2]
        else if (avgWeight > 0.33) return mithraicColors[1]
        else return mithraicColors[0]
      }


      // drawing mithraea
      const uniqueMithraea = []
      const mithraeaDistanceThreshold = 10000

      console.log(appState.controlOptions.mithorig)

      data.mithraea.features
        .filter(m => m.geometry)
        .filter(m => appState.controlOptions.mithorig[m.properties.c])
        .map(mith => {
          const cs = L.latLng(mith.geometry.coordinates[1], mith.geometry.coordinates[0])
          const isThere = uniqueMithraea.find(uf => uf.cs.distanceTo(cs) < mithraeaDistanceThreshold)
          isThere ? isThere.items.push(mith.properties) : uniqueMithraea.push({cs: cs, items:[mith.properties]})
        })

      console.log(uniqueMithraea)

      const mithraeaPoints = uniqueMithraea.map( mith => {
        return {
          marker: 
            L.circleMarker(
              mith.cs, 
              {radius: 3 + mith.items.length * 0.3, className: 'map-mithraea', fillColor: colorProbability(mith.items.map(i => i.c))}
            ).bindTooltip(mith.items.map( item => 'mithraeum <b>' + item.n + '</b> (' + item.c + ')').join('<br/ >')),
          properties: {p: weightProbability(mith.items.map(i => i.c))}
        }
      })


      mithraeaGrid.addLayers(mithraeaPoints)
      this.dataLayers.push(mithraeaGrid)
    }
}

