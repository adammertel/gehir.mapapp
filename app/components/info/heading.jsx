import React from 'react'
import Styles from '../../enums/styles'
import Base from '../../base'

export default class InfoHeading extends React.Component {

    render () {
      const topic = Base.getActiveMapTopic()
      return (
        <div style={Styles['INFO_HEADING_WRAPPER']()}>
          <div style={Styles['INFO_HEADING_H1']()}>
            {topic.infoHeading}
          </div>
          <div style={Styles['INFO_HEADING_H2']()}>
            {topic.infoSubHeading}
          </div>
        </div>
      );
    }
}
