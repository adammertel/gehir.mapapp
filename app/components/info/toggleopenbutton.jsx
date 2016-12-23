import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'

import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

export default class InfoToggleOpenButton extends React.Component {


    toggleButtonStyle () {
      return ({
        position: 'fixed',
        right: '30px',
        top: Styles['MENU_HEIGHT'],
        color: Styles['COLOR_WHITE'],
        backgroundColor: Styles['COLOR_BLACK1'],
      })
    }


    toggleButtonText () {
      if (this.props.open) {
        return 'keyboard_arrow_down'
      } else {
        return 'keyboard_arrow_up'
      }
    }


    render () {
      var that = this;
      return (
        <RaisedButton
          onClick={this.props.handleClick}
          style={this.toggleButtonStyle()}
          icon={<FontIcon className="material-icons" >{that.toggleButtonText()}</FontIcon>}
        />
      );
    }
}
