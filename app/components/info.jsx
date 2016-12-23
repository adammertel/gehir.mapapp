import React from 'react'
import Styles from '../enums/styles'

import MapTopics from '../enums/maptopics'
import Actions from '../enums/actions'

import InfoToggleOpenButton from './info/toggleopenbutton'


export default class InfoContainer extends React.Component {

    infoStyle (open) {
      let map = this.props.app.getActiveMap();
      return ({
        position: 'absolute',
        left: Styles['PANEL_WIDTH'],
        right: '0px',
        top: Styles['MENU_HEIGHT'],
        height:  Styles['INFO_HEIGHT'],
        overflow: 'hidden',
        backgroundColor: map.color1,
      })
    }


    toggleInfoPanel () {
      dispatcher.dispatch(Actions['INFOTOGGLE'], {})
    } 


    render () {
      return (
        <div className='info-wrapper' style={this.infoStyle(this.props.appState.infoOpen)}>
          <InfoToggleOpenButton handleClick={this.toggleInfoPanel.bind(this)} open={this.props.appState.infoOpen} />
        </div>
      );
    }
}
