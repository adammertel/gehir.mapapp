import React from 'react'
import Styles from '../../enums/styles'

import MapOverlays from '../../enums/mapoverlays'

import Checkbox from 'material-ui/Checkbox';

export default class OverlaysList extends React.Component {

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
          <h4>Ovelays:</h4>
          <div className="panel-overlays-list">
            {
              Object.keys(MapOverlays).map(function(mapOverlayKey) {
                let mapOverlay = MapOverlays[mapOverlayKey];
                return(
                  <Checkbox
                    label={mapOverlay.name}
                    onClick={that.props.handleChangeOverlays.bind(this, mapOverlay.id)}
                    key={mapOverlayKey}  
                    checked={appState.activeOverlays.indexOf(mapOverlay.id) != -1}
                  />
                );
              })
            }
          </div>
        </div>
      );
    }
}
