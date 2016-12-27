import React from 'react'
import Styles from '../../enums/styles'

export default class InfoHeading extends React.Component {

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_HEADING']()}>
          {this.props.headingText}
        </div>
      );
    }
}
