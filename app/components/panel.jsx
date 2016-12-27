import React from 'react'
import Styles from '../enums/styles'
import Actions from '../enums/actions'

import PanelBaseLayersList from './panel/baselayerslist'
import OverlaysList from './panel/overlayslist'
import MapBaseLayers from '../enums/mapbaselayers'

export default class PanelContainer extends React.Component {

    componentDidMount () {
    }

    changeBaseMap (baseMapId) {
      dispatcher.dispatch(Actions['MAP_BASE_LAYER_CHANGE'], {newBaseLayer: baseMapId})
    }

    toggleOverlay (overlayMapId) {
      dispatcher.dispatch(Actions['MAP_OVERLAY_TOGGLE'], {overlayToToggle: overlayMapId})
    }

    render () {
      var that = this

      return (
        <div className='panel-wrapper' style={Styles['PANEL_WRAPPER']()}>
          <PanelBaseLayersList 
            handleChangeBaseLayer={this.changeBaseMap} 
            activeBaseLayer={this.props.appState.activeBaseLayer}
          />
          <OverlaysList 
            container={this} 
            handleChangeOverlays={this.toggleOverlay} 
            activeBaseLayer={this.props.appState.activeBaseLayer}
          />
        </div>
      );
    }
}
