import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'

import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'


export default class InfoToggleOpenButton extends React.Component {

    toggleButtonIcon () {
      if (this.props.open) {
        return 'keyboard_arrow_up'
      } else {
        return 'keyboard_arrow_down'
      }
    }

    toggleButtonLabel () {
      if (this.props.open) {
        return 'less info'
      } else {
        return 'more info'
      }
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
