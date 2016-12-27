import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'

export default class MenuChangeMapButton extends React.Component {

    render () {
      var that = this;
      return (
        <button
          onClick={this.props.changeMapHandle}
          style={Styles['MENU_BUTTON'](this.props.mapMode)}
        >
        {
          this.props.mapMode.label.toUpperCase()
        }
        </button>
      );
    }
}
