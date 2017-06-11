import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'

import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'


export default class InfoHelpButton extends React.Component {

    render () {
      var that = this;
      return (
        <RaisedButton
          onTouchTap={this.props.handleClick}
          labelPosition="before"
          style={Styles['INFO_TOGGLE_BUTTON']()}
          labelStyle={Styles['INFO_TOGGLE_BUTTON_LABEL']()}
          label={'more info'}
          primary={true}
          icon={
            <FontIcon style={Styles['INFO_TOGGLE_BUTTON_ICON']()} className="material-icons md-48" >info</FontIcon>
          }
        />
      );
    }
}
