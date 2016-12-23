import React from 'react'
import Styles from '../../enums/styles'

export default class MenuLogo extends React.Component {


    logoWrapperStyle () {
      return ({
        height: Styles['MENU_HEIGHT'],
        width: Styles['PANEL_WIDTH'],
        top: '0px',
        left: '0px',
        position: 'absolute',
        backgroundColor: Styles['COLOR_ORANGE'],
        margin: '-4px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: Styles['COLOR_BLACK1'],
      })
    }

    logoStyle () {
      return ({
        top: '15px',
        left: '15px',
        position: 'absolute',
        color: Styles['COLOR_WHITE'],
        fontSize: '38px',
      })
    }

    logoSubStyle () {
      return ({
        position: 'absolute',
        fontSize: '10px',
        top: '20px',
        left: '140px',
        color: Styles['COLOR_BLACK1']
      })
    }


    render () {
      var that = this;
      return (
        <span style={this.logoWrapperStyle()}>
          <span className="menu-gehir" style={this.logoStyle()}>GEHIR</span>
          <span style={this.logoSubStyle()}>Generative<br /> Historiography<br />of Religion Project</span>
        </span>
      )
    }
}
