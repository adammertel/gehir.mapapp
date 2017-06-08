import React from 'react'
import Styles from '../../enums/styles'

import MapBaseLayers from '../../enums/mapbaselayers'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import FontIcon from 'material-ui/FontIcon'


export default class PanelBaseLayersList extends React.Component {

    componentDidMount () {
    }

    render () {
      return (
        <div>
          <h4>Base Layers:</h4>
            <div className="panel-baselayers-list">
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
          </div>
      );
    }
}