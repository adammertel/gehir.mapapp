import React from 'react'
import Styles from '../enums/styles'

import MapTopics from '../enums/maptopics'
import Actions from '../enums/actions'
import Base from '../base'

import InfoHelpButton from './info/helpbutton'
import InfoHeading from './info/heading'
import InfoLegend from './info/legend'
import InfoControl from './info/control'


export default class InfoContainer extends React.Component {

    _handleOpenModal = () => {
      dispatcher.dispatch(Actions['MODAL_OPEN'], {})
    }

    render () {
      const open = appState.infoOpen
      const activeTopic = Base.getActiveMapTopic()

      return (
        <div className='info-wrapper' style={Styles['INFO_WRAPPER']()}>
          
          <div style={{display: 'flex', marginTop: 10}} >
            <InfoHeading />
            <InfoHelpButton handleClick={this._handleOpenModal} />
          </div>

          <div style={Styles['INFO_CONTENT']()}>
            <InfoControl topic={activeTopic} />
            <InfoLegend topic={activeTopic} />
          </div>
        </div>
      )
    }
}
