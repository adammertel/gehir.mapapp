import React from 'react'
import Styles from '../enums/styles'
import Actions from '../enums/actions.js'
import MapTopics from '../enums/maptopics'

import MenuLogo from './menu/logo'


export default class MenuContainer extends React.Component {

    componentDidMount () {
    }

    changeMap (newMapName) {
      dispatcher.dispatch(Actions['MAP_TOPIC_CHANGE'], {newMapMode: newMapName})
    }

    render () {
      var that = this
      return (
        <div className="menu-wrapper" style={Styles['MENU_WRAPPER']()}>
          <MenuLogo />
        </div>
      )
    }
}
