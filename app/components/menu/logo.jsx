import React from 'react'
import Styles from '../../enums/styles'

export default class MenuLogo extends React.Component {

    _redirectToGehirPage () {
      window.location.assign('http://gehir.phil.muni.cz')
    }

    render () {
      return (
        <span style={Styles['LOGO_WRAPPER']()} onClick={this._redirectToGehirPage.bind(this)} >
          <span className="menu-gehir" style={Styles['LOGO']()}>GEHIR</span>
          <span style={Styles['LOGO_SUB']()}>Generative<br /> Historiography<br />of Religion Project</span>
        </span>
      )
    }
}
