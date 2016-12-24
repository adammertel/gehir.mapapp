import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MapTopics from './enums/maptopics.js'
import dispatcher from './dispatcher.js'



// initial app state
console.log(dispatcher)
window['dispatcher'] = dispatcher
window['appUpdate'] = null
window['appState'] = {
  infoOpen: true,
  activeBaseLayer: 'imperium',
  activeMapTopic: MapTopics.OVERVIEW.label
}

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
)