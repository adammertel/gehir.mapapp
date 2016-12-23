import Styles from './styles'

var MapTopics = {
  'OVERVIEW': {
    label: 'overview',
    color1: Styles['COLOR_GREY'],
    color2: Styles['COLOR_GREY'],
    originLatLng: [40,20],
    originZoom: 4,
  },
  'ISIS': {
    label: 'isis',
    color1: Styles['COLOR_1A'],
    color2: Styles['COLOR_1B'],
    originLatLng: [40,30],
    originZoom: 5,
  },
  'MARLUC': {
    label: 'marluc',
    color1: Styles['COLOR_2A'],
    color2: Styles['COLOR_2B'],
    originLatLng: [20,40],
    originZoom: 6,
  },
  'CHRISTROME': {
    label: 'christrome',
    color1: Styles['COLOR_3A'],
    color2: Styles['COLOR_3B'],
    originLatLng: [20,20],
    originZoom: 5,
  },
  'MITHORIG': {
    label: 'mithorig',
    color1: Styles['COLOR_4A'],
    color2: Styles['COLOR_4B'],
    originLatLng: [20,20],
    originZoom: 5,
  },
}

module.exports = MapTopics
