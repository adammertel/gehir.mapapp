import React from 'react'
import Styles from '../enums/styles'
import Actions from '../enums/actions'

import PanelBaseLayersList from './panel/baselayerslist'
import OverlaysList from './panel/overlayslist'
import MapBaseLayers from '../enums/mapbaselayers'

export default class PanelContainer extends React.Component {

    componentDidMount () {
    }

    panelStyle () {
      return ({
        position: 'absolute',
        left: '0px',
        width: Styles['PANEL_WIDTH'],
        top: Styles['MENU_HEIGHT'],
        bottom: '0px',
        overflow: 'hidden',
        backgroundColor: Styles['COLOR_BLACK1'],
        color: Styles['COLOR_WHITE'],
        padding: '10px'
      })
    }


    changeBaseMap (baseMapId) {
      dispatcher.dispatch(Actions['MAPBASELAYERCHANGE'], {newBaseLayer: baseMapId})
    }

    toggleOverlay (overlayMapId) {
      dispatcher.dispatch(Actions['MAPOVERLAYTOGGLE'], {overlayToToggle: overlayMapId})
    }


    styleBaseLayerLabel (tile) {
      let fWeight = '300';
      let fDecorator = 'line-through';

      if (tile.active) {
        fWeight = '800';
        fDecorator = '';
      }
      return ({
        fontWeight: fWeight,
        textDecoration: fDecorator,
        cursor: 'pointer'
      })
    }


    render () {
      var that = this;

      return (
        <div className='panel-wrapper' style={this.panelStyle()}>
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
