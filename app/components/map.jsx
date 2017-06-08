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
            maxBounds={[[0, -30], [60, 60]]}
            maxZoom={10} 
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

      const t1 = new Date()
      
      switch (topic) {

        // overview
        case MapTopics['OVERVIEW'].label:
          break

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
        const t2 = new Date()
        console.log('')
        console.log('topic', topic, 'drawn after', (t2.valueOf() - t1.valueOf()), 'ms')
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

      // temples
      const templeOptions = {
        maxDist: 80000,
        noSteps: 8,
        circleSegmentAngle: 20,
        colors: isisColors,
        propertyName: 'deities'
      }
      const temples = L.carouselMarkerGroup(templeOptions)
      const templesJson = L.geoJSON(data.isis_temples)
      const templeLayers = templesJson.getLayers()

      temples.addLayers(templeLayers)


      // artefacts
      const artefactsOptions = {
        maxDist: 40000,
        noSteps: 4,
        circleSegmentAngle: 20,
        colors: isisColors,
        propertyName: 'deities'
      }
      const artefacts = L.carouselMarkerGroup(artefactsOptions)
      const artefactsJson = L.geoJSON(data.isis_artefacts)
      const artefactLayers = artefactsJson.getLayers()

      artefacts.addLayers(artefactLayers)
      
      this.dataLayers.push(artefacts)
      this.dataLayers.push(temples)

      this.dataLayers.push(
        L.geoJSON(data.isis_artefacts, {
          pointToLayer: (point, ll) => L.circleMarker(ll, 
            {radius: 1.5, className: 'points-artefacts'}
          )
        }).bindTooltip( (layer) => layer.feature.properties.label)
      )

      this.dataLayers.push(
        L.geoJSON(data.isis_temples, {
          pointToLayer: (point, ll) => L.circleMarker(ll, 
            {radius: 1.5, className: 'points-artefacts'}
          )
        }).bindTooltip( (layer) => layer.feature.properties.label)
      )
    }



    /* 
      CHRISTROME TOPIC
    */
    visualiseChristrome() {
      const churchesGroups = [
        {
          id: 1,
          time: [313],
          items: [],
          color: 'yellow'
        },
        {
          id: 2,
          time: [350],
          items: [],
          color: 'orange'
        },
        {
          id: 3,
          time: [600],
          items: [],
          color: 'red'
        }
      ]
      const regions = Object.assign({}, data.regions)
      data.churches.features.map(church => {
        const date = church.properties.date
        if (date) {
          churchesGroups.map(group => {
            if (group.time > date) {
              church.geometry ? group.items.push(church) : null;
            }
          })
        }
      })

      churchesGroups.map(group => {
        const fc = turf.featureCollection(group.items)
        group.buffer = dissolve(turf.buffer(fc, 50, 'kilometers'))
        // this.dataLayers.push(
        //   L.geoJSON(group.buffer, {style: () => {
        //     console.log(group.color)
        //     return {fillColor: group.color}
        //   }})
        // )
      })

      regions.features.map(region => {
        region.properties.time = [];
        const regionBbox = L.geoJSON(region).getBounds()
        //console.log(regionBbox)

        churchesGroups.map(group => {
          const intersects = group.buffer.features.find(buffer => {
            return L.geoJSON(buffer).getBounds().intersects(regionBbox) && !!(turf.intersect(buffer, region))
          })
          if (intersects) {
            region.properties.time.push(group.id)
          }
        })
      })

      this.dataLayers.push(L.geoJSON(regions, {
        style: (feature) => {
          let color = 'white'
          if (feature.properties.time.indexOf(1) > -1) {
            color = 'red'
          } else if (feature.properties.time.indexOf(2) > -1) {
            color = 'orange'
          } else if (feature.properties.time.indexOf(3) > -1) {
            color = 'yellow'
          }
          return {
            opacity: 1, 
            weight: 1, 
            color: 'white', 
            fillColor: color
          }
        } 
      }))
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
                "range": [4, 13]
            },
            "fillOpacity": .7,
            "weight": 1,
            "color": "black",
            "fillColor": {
                "method": "min",
                "attribute": "date",
                "scale": "size",
                "range": ['#c51b8a', '#fa9fb5', '#fde0dd']
            },
        }
      }
      const congregatesRules = {
        cells: {
            "fillColor": {
                "method": "count",
                "attribute": "",
                "scale": "size",
                "range": ['#ffffd4','#fed98e','#fe9929','#cc4c02']
            },
            "fillOpacity": 0.4,
            "weight": 1,
            "color": 'black'
        },
      }

      const marlucOptions = {
          gridMode: 'square',
          showTexts: false,
          showMarkers: false,
          showCells: false,
          zoomShowElements: 8,
          gridOrigin: {lat: 20, lng: -10},
          zoomHideGrid: 8,
          zoneSize: 6000,
      }

      const synagogueGrid = L.regularGridCluster( 
        Object.assign(marlucOptions, {showMarkers: true, rules: synagogueRules})
      );

      const congregatesGrid = L.regularGridCluster( 
        Object.assign(marlucOptions, {showCells: true, rules: congregatesRules})
      );

      const synagoguePoints = data.synagogues.features.map( synagogue => {
        return {
          marker: L.circleMarker(turf.flip(synagogue.geometry).coordinates, {radius: 0.2, color: 'black'}),
          properties: {date: synagogue.properties.date}
        }
      })

      const congregatesPoints = data.congregates.features.map( congregate => {
        return {
          marker: L.circleMarker(turf.flip(congregate.geometry).coordinates, {radius: 0.2, color: 'black'}),
          properties: {}
        }
      })

      synagogueGrid.addLayers(synagoguePoints)
      congregatesGrid.addLayers(congregatesPoints)
      this.dataLayers.push(synagogueGrid)
      this.dataLayers.push(congregatesGrid)
    }



    /* 
      MITHORIG TOPIC
    */
    visualiseMithorig() {
      // forts
      const fortRules = {
        cells: {
            "fillColor": {
                "method": "count",
                "attribute": "",
                "scale": "quantile",
                "range": ['#eff3ff','#bdd7e7','#6baed6','#2171b5']
            },
            "fillOpacity": 0.4,
            "weight": 0
        }
      }

      const mithreaRules = {
        markers: {
          "radius": {
              "method": "count",
              "attribute": "",
              "scale": "continuous",
              "range": [3,10]
          },
          "color": 'black',
          "weight": 1,
          "fillOpacity": 0.8,
          "fillColor": {
              "method": "mean",
              "attribute": "p",
              "scale": "continuous",
              "domain": [0, 1],
              "range": ['#fc8d59','#ffffbf','#91cf60']               
          }
        }
      }

      const gridOptions = {
          gridMode: 'hexagon',
          showTexts: false,
          showMarkers: false,
          showCells: false,
          zoomShowElements: 8,
          gridOrigin: {lat: 20, lng: -10},
          zoomHideGrid: 8,
          zoneSize: 2500,
      }

      const fortGrid = L.regularGridCluster( 
        Object.assign(gridOptions, {showCells: true, rules: fortRules})
      );

      const fortPoints = data.forts.features.map( fort => {
        return {
          marker: L.circleMarker(turf.flip(fort.geometry).coordinates, {radius: 0.2, color: 'black'}),
          properties: {}
        }
      })

      fortGrid.addLayers(fortPoints)
      this.dataLayers.push(fortGrid)

      // mithrea
      const mithreaGrid = L.regularGridCluster(
        Object.assign(gridOptions, {showMarkers: true, rules: mithreaRules})
      );

      const weightProbability = (probability) => {
        if (probability === 'definitive') return 1
        else if (probability === 'probable') return 0.7
        else if (probability === 'dubious') return 0.3
        else return 1
      }

      const mithreaPoints = data.mithrea.features.map( mithrea => {
        return {
          marker: L.circleMarker(
            turf.flip(mithrea.geometry).coordinates, {radius: 0.2, color: 'red'}
          ),
          properties: {p: weightProbability(mithrea.properties.c)}
        }
      })
      mithreaGrid.addLayers(mithreaPoints)
      this.dataLayers.push(mithreaGrid)
    }
}

