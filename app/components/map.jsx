import L from 'leaflet';
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import Actions from '../enums/actions';
import Styles from '../enums/styles';
import MapBaseLayers from '../enums/mapbaselayers.js'
import Base from '../base'

export default class MapContainer extends React.Component {

    componentDidMount () {
      this.lEl = this.refs.map.leafletElement;
      this.afterRender()
    }
    
    componentDidUpdate () {
      this.afterRender();
    }
    
    afterRender () {
      //this.lEl.setZoom(Math.random() * 10, true);
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


    wrapperStyle () {
      let mapH = Styles['INFO_MENU_HEIGHT'](this.props.appState.infoOpen);

      return ({
        position: 'absolute',
        left: Styles['PANEL_WIDTH'],
        right: '0px',
        top: mapH,
        bottom: '0px',
        overflow: 'hidden'
      })
    }

    mapStyle () {
      return ({
        width: '100%',
        height: '100%',
        overflow: 'hidden'
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
      dispatcher.dispatch(Actions['MAPCHANGECENTER'], {newMapCenter: centerLL})
    }

    zoomEndHandle () {
      var zoom = this.lEl.getZoom();
      dispatcher.dispatch(Actions['MAPCHANGEZOOM'], {newMapZoom: zoom})
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
            />
          )
        }
      })
      return baseLayers;
    }

    render () {
      var that = this

      return (
        <div className='map-wrapper' style={this.wrapperStyle()}>
          <Map
            ref="map" 
            minZoom = {2}
            maxBounds = {[[0, -30], [60, 60]]}
            maxZoom = {10} 
            center = {appState.mapCenter}
            style = {this.mapStyle()}
            zoom = {appState.mapZoom}
            onMoveEnd = {this.moveEndHandle.bind(this)}
            onZoomEnd = {this.zoomEndHandle.bind(this)}
          >
            { this.renderBaseLayers() }
          </Map>
        </div>
      );
    }
}
