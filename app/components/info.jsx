import React from 'react'
import Styles from '../enums/styles'

import MapTopics from '../enums/maptopics'
import Actions from '../enums/actions'
import Base from '../base'

import InfoToggleOpenButton from './info/toggleopenbutton'
import InfoText from './info/text'
import InfoHeading from './info/heading'
import InfoSubHeading from './info/subheading'
import InfoLegend from './info/legend'


export default class InfoContainer extends React.Component {

    toggleInfoPanel () {
      dispatcher.dispatch(Actions['INFO_TOGGLE'], {})
    }

    render () {
      let open = appState.infoOpen
      let aMap = Base.getActiveMapTopic()
      return (
        <div className='info-wrapper' style={Styles['INFO_WRAPPER'](open, aMap)}>
          <div style={{display: 'flex', marginTop: 10}} >
            <InfoToggleOpenButton handleClick={this.toggleInfoPanel.bind(this)} open={this.props.appState.infoOpen} />
            <InfoHeading headingText={Base.getActiveMapTopic().infoHeading} />
            <InfoSubHeading subheadingText={Base.getActiveMapTopic().infoSubHeading} />
          </div>
          <InfoLegend topic={Base.getActiveMapTopic()} />
          <InfoText text={Base.getActiveMapTopic().infoText} />
        </div>
      )
    }
}
