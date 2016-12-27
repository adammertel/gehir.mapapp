import React from 'react'
import Styles from '../../enums/styles'

export default class InfoText extends React.Component {

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_TEXT']()}>
          {this.props.text}
        </div>
      );
    }
}
