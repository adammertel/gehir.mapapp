import React from 'react'
import Styles from '../enums/styles'
import Actions from '../enums/actions'

import PanelBaseLayersList from './panel/baselayerslist'
import PanelOverlaysList from './panel/overlayslist'
import PanelTopicsList from './panel/topicslist'
import MapBaseLayers from '../enums/mapbaselayers'
import MenuContainer from './menu'

export default class PanelContainer extends React.Component {

    componentDidMount () {
    }

    changeBaseMap (baseMapId) {
      dispatcher.dispatch(Actions['MAP_BASE_LAYER_CHANGE'], {newBaseLayer: baseMapId})
    }

    toggleOverlay (overlayMapId) {
      dispatcher.dispatch(Actions['MAP_OVERLAY_TOGGLE'], {overlayToToggle: overlayMapId})
    }

    changeTopic (topicName) {
      dispatcher.dispatch(Actions['MAP_TOPIC_CHANGE'], {newTopic: topicName})
    }

    render () {
      var that = this

      return (
        <div className='panel-wrapper' style={Styles['PANEL_WRAPPER']()}>
          <MenuContainer />
          <PanelTopicsList 
            handleChangeTopic={this.changeTopic} 
            activeMapTopic={this.props.appState.activeMapTopic}
          />
          <PanelBaseLayersList 
            handleChangeBaseLayer={this.changeBaseMap} 
            activeBaseLayer={this.props.appState.activeBaseLayer}
          />
          <PanelOverlaysList 
            handleChangeOverlays={this.toggleOverlay} 
            activeBaseLayer={this.props.appState.activeBaseLayer}
          />
        </div>
      )
    }
}
