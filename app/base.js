import MapTopics from './enums/maptopics'


var Base = {

  getActiveMapTopic: function () {
    let mapName = Object.keys(MapTopics).find(function (mapName, mi) {
      let map = MapTopics[mapName]
      return appState.activeMapTopic == map.label
    })
    return MapTopics[mapName];
  },

  getMapTopicById: function (id) {
    let mapKey = Object.keys(MapTopics).find(function (mapName, mi) {
      let map = MapTopics[mapName]
      return id == map.label
    })
    return MapTopics[mapKey];
  },

}

module.exports = Base