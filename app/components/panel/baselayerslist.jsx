import React from 'react'
import Styles from '../../enums/styles'

import MapBaseLayers from '../../enums/mapbaselayers'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import FontIcon from 'material-ui/FontIcon'


export default class PanelBaseLayersList extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        expanded: false
      }
    }

    _handleExpand () {
      this.setState({expanded: !this.state.expanded})
    }

    componentDidMount () {
    }

    render () {
      return (
        <div style={Styles['PANEL_LIST']()} >
          <div style={Styles['PANEL_HEADER_ROW']()} onClick={this._handleExpand.bind(this)}>
            <h4 style={Styles['PANEL_HEADER_TITLE']()}>Base Layers:</h4>
            <FontIcon
              style={Styles['PANEL_EXPAND_BUTTON']()} 
              className="material-icons md-48"
            >
              keyboard_arrow_down
            </FontIcon>
          </div>
          {
            this.state.expanded ?
            (
              <div className="panel-overlays-list">
                {
                Object.keys(MapBaseLayers).map( mapTileKey => {
                  let mapTile = MapBaseLayers[mapTileKey];

                  return(
                    <div key={mapTileKey} style={Styles['PANEL_BUTTON_ROW']()}>
                      <RadioButton
                        value={mapTile.id}
                        label={mapTile.name}
                        checked={appState.activeBaseLayer == mapTile.id}
                        onClick={this.props.handleChangeBaseLayer.bind(this, mapTile.id)}
                        style={Styles['PANEL_BUTTON_CELL']()}                        
                      />
                      <FontIcon 
                        data-tip={mapTile.info}
                        style={Styles['PANEL_HELP_BUTTON']()} 
                        className="material-icons md-48" 
                      >
                        help
                      </FontIcon>
                    </div>
                  );
                })
              }
              </div>
            ) : null
          }
        </div>
      );
    }
}