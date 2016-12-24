import React from 'react';

import MapContainer from './components/map'
import PanelContainer from './components/panel'
import MenuContainer from './components/menu'
import InfoContainer from './components/info'

import MapTopics from './enums/maptopics'
import MapBaseLayers from './enums/mapbaselayers'



require('./App.css');

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

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
          <MenuContainer appState={this.state} app={this} />
          <PanelContainer appState={this.state} app={this} />
          <InfoContainer appState={this.state} app={this} />
          <MapContainer appState={this.state} app={this} />
        </div>
      </MuiThemeProvider>
    );
  }
}
