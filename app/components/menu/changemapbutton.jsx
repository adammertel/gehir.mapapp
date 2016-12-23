import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'

export default class MenuChangeMapButton extends React.Component {


    buttonStyle (map) {
      let buttonColor = map['color1'];
      let buttonFontColor = Styles['COLOR_WHITE'];
      
      if (appState.activeMapTopic === map.label) {
        buttonColor = map['color2'];
        buttonFontColor = Styles['COLOR_BLACK'];
      }

      return ({
        backgroundColor: buttonColor,
        height: Styles['MENU_HEIGHT'],
        borderColor: Styles['COLOR_BLACK2'],
        borderWidth: '0px 3px 0px 0px',
        color: buttonFontColor,
        width: Styles['MENU_BUTTON_WIDTH'],
      })
    }


    render () {
      var that = this;
      return (
        <button
          onClick={this.props.changeMapHandle}
          style={this.buttonStyle(this.props.mapMode)}
        >
        {
          this.props.mapMode.label.toUpperCase()
        }
        </button>
      );
    }
}
