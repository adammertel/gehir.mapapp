import React from 'react'
import Styles from '../../enums/styles'

import MapBaseLayers from '../../enums/mapbaselayers'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

export default class PanelBaseLayersList extends React.Component {

    componentDidMount () {
    }

    panelStyle () {
      return ({
        position: 'absolute',
        left: '0px',
        width: Styles['PANEL_WIDTH'],
        top: Styles['MENU_HEIGHT'],
        bottom: '0px',
        overflow: 'hidden',
        backgroundColor: Styles['COLOR_BLACK1'],
        color: Styles['COLOR_WHITE'],
        padding: '10px'
      })
    }


    styleBaseLayerLabel (tile) {
      let fWeight = '300';
      let fDecorator = 'line-through';

      if (tile.active) {
        fWeight = '800';
        fDecorator = '';
      }
      return ({
        fontWeight: fWeight,
        textDecoration: fDecorator,
        cursor: 'pointer'
      })
    }

    divButtonStyle () {
      return (
        {
          display: 'table-row'
        }
      )
    }

    helpButtonStyle () {
      return (
        {
          float: 'right',
          marginRight: '20px',
          display: 'table-cell',
          cursor: 'pointer'
        }
      )
    }

    inlineButtonStyle () {
      return (
        {
          display: 'table-cell'
        }
      )
    }


    render () {
      var that = this;

      return (
        <div>
          <h4>Base Layers:</h4>
            <div className="panel-baselayers-list">
              {
                Object.keys(MapBaseLayers).map(function(mapTileKey) {
                  let mapTile = MapBaseLayers[mapTileKey];

                  return(
                    <div key={mapTileKey} style={that.divButtonStyle()}>
                      <RadioButton
                        value={mapTile.id}
                        label={mapTile.name}
                        checked={appState.activeBaseLayer == mapTile.id}
                        onClick={that.props.handleChangeBaseLayer.bind(this, mapTile.id)}
                        style={that.inlineButtonStyle()}                        
                      />
                      <FontIcon 
                        data-tip={mapTile.info}
                        style={that.helpButtonStyle()} 
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
