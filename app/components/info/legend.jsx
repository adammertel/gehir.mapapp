import React from 'react'
import Styles from '../../enums/styles'

export default class InfoLegend extends React.Component {

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_LEGEND']()}>
          <h4 style={Styles['HEADER4']()}>LEGEND</h4>
          {this.props.topic.label}
        </div>
      );
    }
}
