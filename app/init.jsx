import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MapTopics from './enums/maptopics'
import dispatcher from './dispatcher'
import Base from './base'
import Actions from './enums/actions.js'


// initial app state
window['dispatcher'] = dispatcher
window['appUpdate'] = null
window['data'] = {}
window['map'] = false
window['newwRefreshMap'] = false

const initTopic = MapTopics.ISIS

window['appState'] = {
  infoOpen: false,
  activeBaseLayer: 'awmc',
  activeMapTopic: initTopic.label,
  mapCenter: initTopic.originLatLng,
  mapZoom: initTopic.originZoom,
  modal: 'welcome',
  activeOverlays: [],
  controlOptions: {
    isis: {
      artefactDistance: 60000,
      templeDistance: 100000,
      opacityDecrease: 1
    },
    marluc: {
      synagogueDateBefore: 400,
      congregatesYear: '200'
    },
    christrome: {
      churchRadius: 80,
      mode: 'regions'
    },
    mithorig: {
      gridSize: 7000,
      dubious: true,
      definitive: true,
      probable: true
    }
  }
}

Object.keys(MapTopics).map( mapTopicKey => {
  const mapTopic = MapTopics[mapTopicKey]
  mapTopic.dataFiles.map( dataFile => {
    window['data'][dataFile.name] = Base.requestDataFile(dataFile.path + '.' + dataFile.type)
  })
})

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
)
