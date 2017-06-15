import React from 'react'

import MapContainer from './components/map'
import PanelContainer from './components/panel'
import InfoContainer from './components/info'
import ModalContainer from './components/modal'

import MapTopics from './enums/maptopics'
import MapBaseLayers from './enums/mapbaselayers'

import ReactTooltip from 'react-tooltip'

require('./App.css')

import {red700, grey800} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey800,
    primary1Color: red700,
  },
  appBar: {
    height: 50,
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    window['appUpdate'] = this.updateState.bind(this)
  }

  componentWillMount () {
    appUpdate()
  }

  updateState () {
    console.log('newstate', (appState))
    this.setState(appState)
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {
            appState.modal ? (<ModalContainer />) : null
          }
          <PanelContainer />
          <InfoContainer />
          <MapContainer />
          <ReactTooltip place="right" type="dark" effect="solid"/>
        </div>
      </MuiThemeProvider>
    )
  }
}
