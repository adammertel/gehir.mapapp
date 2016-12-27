import React from 'react'
import Styles from '../../enums/styles'

export default class MenuLogo extends React.Component {

    render () {
      var that = this;
      return (
        <span style={Styles['LOGO_WRAPPER']()}>
          <span className="menu-gehir" style={Styles['LOGO']()}>GEHIR</span>
          <span style={Styles['LOGO_SUB']()}>Generative<br /> Historiography<br />of Religion Project</span>
        </span>
      )
    }
}
