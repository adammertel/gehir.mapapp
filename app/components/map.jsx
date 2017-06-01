import L from 'leaflet'
import React from 'react'
import { Map, LayerGroup, TileLayer, WMSTileLayer, GeoJSON } from 'react-leaflet'

import Base from '../base'

import Actions from '../enums/actions'
import Styles from '../enums/styles'
import MapTopics from '../enums/maptopics'
import MapBaseLayers from '../enums/mapbaselayers.js'
import MapOverlays from '../enums/mapoverlays.js'
import 'leaflet-semicircle'
import 'leaflet-carousel'


export default class MapContainer extends React.Component {

    componentDidMount () {
      this.lEl = this.refs.map.leafletElement
      this.lastTopic = appState.activeMapTopic
      window['map'] = this.lEl

      this.dataLayer = L.featureGroup()
      this.dataLayer.addTo(map)

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
      console.log('map topic changed')
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
                opacity={mapTile.opacity}
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

    visualiseTopic () {
      const topic = this.props.appState.activeMapTopic

      this.dataLayer.clearLayers()
      
      switch (topic) {

        // overview
        case MapTopics['OVERVIEW'].label:
          break

        // isis
        case MapTopics['ISIS'].label:

          const isisColors = {
            'Isis': '#1f78b4',
            'Sarapis': '#33a02c',
            'Apis': '#e31a1c',
            'Anubis': '#ff7f00',
            'Osiris': '#6a3d9a',
            'Horus': '#b15928',
            'Arsinoe II': '#b15928',
            'Harpocrates': '#b15928',
          }

          // temples
          const templeOptions = {
            maxDist: 80000,
            noSteps: 10,
            circleSegmentAngle: 30,
            colors: isisColors,
            propertyName: 'deities'
          }
          const temples = L.carouselMarkerGroup(templeOptions)
          const templesJson = L.geoJSON(data.isis_temples)
          const templeLayers = templesJson.getLayers()

          temples.addLayers(templeLayers)


          // artefacts
          const artefactsOptions = {
            maxDist: 30000,
            noSteps: 4,
            circleSegmentAngle: 30,
            colors: isisColors,
            propertyName: 'deities'
          }
          const artefacts = L.carouselMarkerGroup(artefactsOptions)
          const artefactsJson = L.geoJSON(data.isis_artefacts)
          const artefactLayers = artefactsJson.getLayers()

          artefacts.addLayers(artefactLayers)

          
          this.dataLayer.addLayer(artefacts)
          this.dataLayer.addLayer(temples)

          break


        // marluc
        case MapTopics['MARLUC'].label:
          break


        // christrome
        case MapTopics['CHRISTROME'].label:
          break


        // mithorig
        case MapTopics['MITHORIG'].label:
          break


      }
    }
}

