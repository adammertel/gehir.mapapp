import React from 'react'
import Styles from '../../enums/styles'

export default class InfoLegend extends React.Component {

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_LEGEND']()}>
          {this.props.topic.label}
        </div>
      );
    }
}
