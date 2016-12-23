import React from 'react'
import Styles from '../enums/styles'
import Actions from '../enums/actions.js'
import MapTopics from '../enums/maptopics'

import MenuChangeMapButton from './menu/changemapbutton'
import MenuLogo from './menu/logo'

export default class MenuContainer extends React.Component {

    componentDidMount () {
    }

    menuStyle () {

      return ({
        position: 'absolute',
        left: '0px',
        width: '100%',
        height: Styles['MENU_HEIGHT'],
        top: '0px',
        overflow: 'hidden',
        backgroundColor: Styles['COLOR_BLACK1']
      })
    }

    buttonsWrapperStyle () {
      return ({
        position: 'absolute',
        left: Styles['PANEL_WIDTH']
      })
    }

    changeMap (newMapName) {
      console.log(newMapName)
      dispatcher.dispatch(Actions['MAPTOPICCHANGE'], {newMapMode: newMapName})
    }


    render () {
      var that = this
      return (
        <div className="menu-wrapper" style={this.menuStyle()}>
          <MenuLogo />
          <span style={this.buttonsWrapperStyle()}>
            {
              Object.keys(MapTopics).map(function (mapKey, mi) {
                let mapMode = MapTopics[mapKey];
                return (
                  <MenuChangeMapButton 
                    key={mi} 
                    changeMapHandle={that.changeMap.bind(this, mapMode.label)}
                    mapMode={mapMode}
                  />
                )
              })
            }
          </span>

        </div>
      );
    }
}
