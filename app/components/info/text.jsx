import React from 'react'
import Styles from '../../enums/styles'

export default class InfoText extends React.Component {

    render () {
      return (
        <div style={Styles['INFO_TEXT']()}>
          <h4 style={Styles['HEADER4']()}>DESCRIPTION</h4>
          {this.props.text}
        </div>
      );
    }
}
