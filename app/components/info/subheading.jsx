import React from 'react'
import Styles from '../../enums/styles'

export default class InfoSubHeading extends React.Component {

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_SUBHEADING']()}>
          {this.props.subheadingText}
        </div>
      );
    }
}
