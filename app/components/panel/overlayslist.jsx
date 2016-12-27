import React from 'react'
import Styles from '../../enums/styles'

import MapOverlays from '../../enums/mapoverlays'

import Checkbox from 'material-ui/Checkbox'
import FontIcon from 'material-ui/FontIcon'

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
          <h4>Ovelays:</h4>
          <div className="panel-overlays-list">
            {
              Object.keys(MapOverlays).map(function(mapOverlayKey) {
                let mapOverlay = MapOverlays[mapOverlayKey];
                return(
                  <div key={mapOverlayKey} style={that.divButtonStyle()}>
                    <Checkbox
                      label={mapOverlay.name}
                      onClick={that.props.handleChangeOverlays.bind(this, mapOverlay.id)}
                      checked={appState.activeOverlays.indexOf(mapOverlay.id) != -1}
                      style={that.inlineButtonStyle()} 
                    />
                    <FontIcon
                      data-tip={mapOverlay.info}
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
