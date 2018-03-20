import MapTopics from './enums/maptopics'


var Base = {

  doRequest (url, next) {
    console.log('async request: ' + url)
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        next(xhr.responseText)
      }
    }
    xhr.open('GET', url, true)
    xhr.send(null)
  },

  doRequestSync (url) {
    console.log('sync request: ' + url)
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.send(null)

    if (xhr.status === 200) {
      return xhr.responseText
    } else {
      return {}
    }
  },

  requestDataFile (dataName) {
    const dataPath = './data/' + dataName
    return JSON.parse(this.doRequestSync(dataPath))
  },

  getActiveMapTopic () {
    let mapName = Object.keys(MapTopics).find(function (mapName, mi) {
      let map = MapTopics[mapName]
      return appState.activeMapTopic == map.label
    })
    return MapTopics[mapName]
  },

  getMapTopicById (id) {
    let mapKey = Object.keys(MapTopics).find(function (mapName, mi) {
      let map = MapTopics[mapName]
      return id == map.label
    })
    return MapTopics[mapKey]
  },

  now () {
    const date = new Date()
    return date.valueOf()
  },

  average (arr) {
    return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length
  }

}

module.exports = Base