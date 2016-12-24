import React from 'react'
import Styles from '../enums/styles'

import MapTopics from '../enums/maptopics'
import Actions from '../enums/actions'
import Base from '../base'

import InfoToggleOpenButton from './info/toggleopenbutton'
import InfoText from './info/text'
import InfoHeading from './info/heading'


export default class InfoContainer extends React.Component {

    infoStyle (open) {
      let map = Base.getActiveMapTopic();
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
      console.log(Base.getActiveMapTopic())
      return (
        <div className='info-wrapper' style={this.infoStyle(this.props.appState.infoOpen)}>
          <InfoHeading headingText={Base.getActiveMapTopic().infoHeading} />
          <InfoText text={Base.getActiveMapTopic().infoText} />
          <InfoToggleOpenButton handleClick={this.toggleInfoPanel.bind(this)} open={this.props.appState.infoOpen} />
        </div>
      );
    }
}
