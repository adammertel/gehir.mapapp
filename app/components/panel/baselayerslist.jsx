import React from 'react'
import Styles from '../../enums/styles'

import MapBaseLayers from '../../enums/mapbaselayers'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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


    render () {
      var that = this;
      return (
        <div>
          <h4>Base Layers:</h4>
            <div className="panel-baselayers-list">
              <RadioButtonGroup name="shipSpeed" defaultSelected={this.props.activeBaseLayer}>
              {
                Object.keys(MapBaseLayers).map(function(mapTileKey) {
                  let mapTile = MapBaseLayers[mapTileKey];

                  return(
                    <RadioButton
                      value={mapTile.id}
                      label={mapTile.name}
                      onClick={that.props.container.changeBaseMap.bind(that.props.app, mapTile.name)}
                      key={mapTileKey}  
                    />
                  );
                })
              }
              </RadioButtonGroup>
            </div>
          </div>
      );
    }
}
