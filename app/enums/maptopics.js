import StyleVariables from './stylevariables'

var MapTopics = {
  'OVERVIEW': {
    color1: StyleVariables['COLOR_GREY'],
    color2: StyleVariables['COLOR_GREY'],
    dataFiles: [],
    infoHeading: 'Overview',
    infoText: 'Nulla facilisi. In consectetur suscipit aliquet. Pellentesque tempus erat non tellus gravida porttitor. Pellentesque fermentum nibh nulla, vel venenatis purus condimentum non. Ut fringilla consectetur mi in laoreet. Nullam feugiat purus ut ipsum tristique rhoncus. Maecenas pulvinar efficitur lacus a dignissim. Proin quis ligula felis. Cras et nisl id lorem posuere volutpat. Suspendisse neque ligula, lacinia eu mi iaculis, lacinia pulvinar risus.',
    label: 'overview',
    originLatLng: [40,20],
    originZoom: 4,
  },
  'ISIS': {
    color1: StyleVariables['COLOR_1A'],
    color2: StyleVariables['COLOR_1B'],
    dataFiles: [
      {path: 'isis_temples', type: 'geojson', name: 'isis_temples'},
      {path: 'isis_artefacts', type: 'geojson', name: 'isis_artefacts'},
    ],
    label: 'isis',
    infoHeading: 'Temples of egyptian gods - concentric circles',
    infoText: 'Aliquam congue dolor vitae velit imperdiet, at pharetra nisl fermentum. Curabitur vitae justo nunc. Mauris imperdiet tellus sapien, vitae dictum lacus maximus non. Suspendisse volutpat bibendum nunc nec facilisis. Etiam quis ipsum posuere, semper diam rutrum, aliquet orci. Vivamus dictum ullamcorper orci. Duis molestie ante in enim ornare mollis. Integer congue pharetra nunc id porta. Suspendisse placerat congue nisi, vel semper nulla mattis in. Ut commodo sit amet ipsum sed tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sed hendrerit ligula. Praesent euismod diam nunc, tristique iaculis leo auctor id. Mauris eu dolor volutpat, laoreet mi ac, venenatis lacus. Donec rutrum justo at consectetur scelerisque.',
    originLatLng: [40,30],
    originZoom: 5,
  },
  'MARLUC': {
    color1: StyleVariables['COLOR_2A'],
    color2: StyleVariables['COLOR_2B'],
    dataFiles: [],
    infoHeading: 'MARLUC',
    infoText: 'Nullam id bibendum ligula. Vivamus posuere tortor lorem, a hendrerit ipsum luctus sit amet. Etiam lectus tortor, posuere eu tortor non, blandit vehicula lacus. Mauris urna quam, semper ut ex quis, pharetra vulputate velit. Integer et augue ut arcu convallis ultricies. Vestibulum fermentum ornare nisi, vel lacinia eros convallis vel. Proin tristique metus id nisl convallis, lobortis accumsan sem vehicula. Ut varius massa at ligula ullamcorper, ut fringilla leo egestas.',
    label: 'marluc',
    originLatLng: [20,40],
    originZoom: 6,
  },
  'CHRISTROME': {
    color1: StyleVariables['COLOR_3A'],
    color2: StyleVariables['COLOR_3B'],
    dataFiles: [],
    infoHeading: 'CHRISTROME',
    infoText: 'Ut tempus est ipsum, ut elementum enim commodo sit amet. Proin eget metus at augue tempus hendrerit. Aenean vitae est pellentesque, vehicula elit et, convallis quam. Phasellus sed metus sollicitudin arcu ultricies rhoncus. Curabitur ut velit a velit tempus sollicitudin. Nulla ac enim euismod, ornare purus eu, lacinia quam. Duis quis pretium orci. Proin accumsan congue pretium. Phasellus est purus, ultrices ut tortor eu, dapibus venenatis sem. Vivamus ut lorem egestas, pharetra lectus sed, imperdiet justo. Nullam a est velit. Vestibulum sed felis eu tellus molestie luctus ut efficitur lectus. Duis id est sagittis, lobortis magna sit amet, consectetur justo. Maecenas pretium libero et sem mollis fermentum. Aenean vel maximus nibh.',
    label: 'christrome',
    originLatLng: [20,20],
    originZoom: 5,
  },
  'MITHORIG': {
    color1: StyleVariables['COLOR_4A'],
    color2: StyleVariables['COLOR_4B'],
    dataFiles: [],
    infoHeading: 'MITHORIG',
    infoText: 'Quisque ut pulvinar dui. Phasellus a orci faucibus, consectetur est ac, facilisis nisi. Duis scelerisque, nisi nec tempor interdum, erat justo lacinia tellus, at iaculis libero odio vitae velit. Integer lobortis congue faucibus. Donec luctus eros vel justo dignissim ornare. In in commodo mi, quis ultrices purus. Nunc rutrum porttitor ex eget malesuada. Proin molestie venenatis porta. Aliquam metus mi, mollis a arcu a, dictum gravida erat. Maecenas enim lacus, accumsan quis pulvinar ut, cursus non felis. Fusce sit amet semper nisl.',
    label: 'mithorig',
    originLatLng: [20,20],
    originZoom: 5,
  },
}

module.exports = MapTopics
