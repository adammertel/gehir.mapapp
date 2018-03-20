import React from 'react'
import Styles from '../../enums/styles'

import MapTopics from '../../enums/maptopics'

import RadioButton from 'material-ui/RadioButton'
import FontIcon from 'material-ui/FontIcon'

export default class PanelOverlaysList extends React.Component {

    componentDidMount () {
    }

    render () {
      return (
        <div style={Styles['PANEL_LIST']()}>
          <div style={Styles['PANEL_HEADER_ROW']()} >
            <h4 style={Styles['PANEL_HEADER_TITLE']()}>Topics:</h4>
          </div>
          <div className="panel-overlays-list">
            {
              Object.keys(MapTopics).map( mapTopicKey => {
                let mapTopic = MapTopics[mapTopicKey];
                return(
                  <div key={mapTopicKey} style={Styles['PANEL_BUTTON_ROW']()}>
                    <RadioButton
                      label={mapTopic.label}
                      onClick={this.props.handleChangeTopic.bind(this, mapTopic.label)}
                      checked={this.props.activeMapTopic === mapTopic.label}
                      style={Styles['PANEL_BUTTON_CELL']()}
                      labelStyle={Styles['PANEL_BUTTON_CELL_LABEL']()}
                    />
                  </div>
                );
             })
            }
          </div>
        </div>
      );
    }
}
