import React from 'react'
import Styles from '../enums/styles'

import MapTopics from '../enums/maptopics'
import Actions from '../enums/actions'
import Base from '../base'

import InfoToggleOpenButton from './info/toggleopenbutton'
import InfoText from './info/text'
import InfoHeading from './info/heading'


export default class InfoContainer extends React.Component {

    toggleInfoPanel () {
      dispatcher.dispatch(Actions['INFO_TOGGLE'], {})
    } 

    render () {
      let open = appState.infoOpen
      let aMap = Base.getActiveMapTopic()
      return (
        <div className='info-wrapper' style={Styles['INFO_WRAPPER'](open, aMap)}>
          <InfoHeading headingText={Base.getActiveMapTopic().infoHeading} />
          <InfoText text={Base.getActiveMapTopic().infoText} />
          <InfoToggleOpenButton handleClick={this.toggleInfoPanel.bind(this)} open={this.props.appState.infoOpen} />
        </div>
      );
    }
}
