import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'

import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'


export default class InfoToggleOpenButton extends React.Component {

    toggleButtonIcon () {
      return this.props.open ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
    }

    toggleButtonLabel () {
      return this.props.open ? 'less info' : 'more info'
    }

    render () {
      var that = this;
      return (
        <FlatButton
          onClick={this.props.handleClick}
          style={Styles['INFO_TOGGLE_BUTTON']()}
          label={this.toggleButtonLabel()}
          icon={
            <FontIcon className="material-icons md-48" >{this.toggleButtonIcon()}</FontIcon>
          }
        />
      );
    }
}
