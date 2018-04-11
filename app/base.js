import MapTopics from './enums/maptopics';

var Base = {
  doRequest(url, next) {
    const req = new XMLHttpRequest();
    req.open('GET', 'app/' + url, true); // `false` makes the request synchronous
    req.withCredentials = false;
    req.send();

    const success = out => {
      next(JSON.parse(out.responseText));
    };
    const error = status => {
      next(false);
    };
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        return req.status === 200 ? success(req) : error(req.status);
      }
    };
  },

  requestDataFile(dataName, next) {
    const dataPath = './data/' + dataName;
    this.doRequest(dataPath, data => next(data));
  },

  getActiveMapTopic() {
    let mapName = Object.keys(MapTopics).find(function(mapName, mi) {
      let map = MapTopics[mapName];
      return appState.activeMapTopic == map.label;
    });
    return MapTopics[mapName];
  },

  getMapTopicById(id) {
    let mapKey = Object.keys(MapTopics).find(function(mapName, mi) {
      let map = MapTopics[mapName];
      return id == map.label;
    });
    return MapTopics[mapKey];
  },

  now() {
    const date = new Date();
    return date.valueOf();
  },

  average(arr) {
    return arr.reduce((p, c) => p + c, 0) / arr.length;
  }
};

module.exports = Base;
