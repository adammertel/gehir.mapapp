import StyleVariables from './stylevariables'

var MapTopics = {
  'CHRISTROME': {
    dataFiles: [
      {path: 'regions', type: 'geojson', name: 'regions'},
      {path: 'churches', type: 'geojson', name: 'churches'},
    ],
    infoHeading: 'Early christian churches',
    infoSubHeading: '',
    historicalContext: 'Ut tempus est ipsum, ut elementum enim commodo sit amet. Proin eget metus at augue tempus hendrerit. Aenean vitae est pellentesque, vehicula elit et, convallis quam. Phasellus sed metus sollicitudin arcu ultricies rhoncus. Curabitur ut velit a velit tempus sollicitudin. Nulla ac enim euismod, ornare purus eu, lacinia quam. Duis quis pretium orci. Proin accumsan congue pretium. Phasellus est purus, ultrices ut tortor eu, dapibus venenatis sem. Vivamus ut lorem egestas, pharetra lectus sed, imperdiet justo. Nullam a est velit. Vestibulum sed felis eu tellus molestie luctus ut efficitur lectus. Duis id est sagittis, lobortis magna sit amet, consectetur justo. Maecenas pretium libero et sem mollis fermentum. Aenean vel maximus nibh.',
    bibliography: [
      'Van Dam, Raymond, and Ramsay MacMullen. "The Second Church: Popular Christianity AD 200–400. Writings from the Greco-Roman World Supplement Series, vol. 1." (2009): 690-692.'
    ],
    cartographicContext: 'Ut tempus est ipsum, ut elementum enim commodo sit amet. Proin eget metus at augue tempus hendrerit. Aenean vitae est pellentesque, vehicula elit et, convallis quam. Phasellus sed metus sollicitudin arcu ultricies rhoncus. Curabitur ut velit a velit tempus sollicitudin. Nulla ac enim euismod, ornare purus eu, lacinia quam. Duis quis pretium orci. Proin accumsan congue pretium. Phasellus est purus, ultrices ut tortor eu, dapibus venenatis sem. Vivamus ut lorem egestas, pharetra lectus sed, imperdiet justo. Nullam a est velit. Vestibulum sed felis eu tellus molestie luctus ut efficitur lectus. Duis id est sagittis, lobortis magna sit amet, consectetur justo. Maecenas pretium libero et sem mollis fermentum. Aenean vel maximus nibh.',
    label: 'Early christian churches',
    originLatLng: [33,20],
    originZoom: 5,
  },
  'MITHORIG': {
    dataFiles: [
      {path: 'forts', type: 'geojson', name: 'forts'},
      {path: 'mithraea', type: 'geojson', name: 'mithraea'}
    ],
    infoHeading: 'Cult of Mithra and military forts',
    infoSubHeading: 'mithrea with forts',
    historicalContext: 'Quisque ut pulvinar dui. Phasellus a orci faucibus, consectetur est ac, facilisis nisi. Duis scelerisque, nisi nec tempor interdum, erat justo lacinia tellus, at iaculis libero odio vitae velit. Integer lobortis congue faucibus. Donec luctus eros vel justo dignissim ornare. In in commodo mi, quis ultrices purus. Nunc rutrum porttitor ex eget malesuada. Proin molestie venenatis porta. Aliquam metus mi, mollis a arcu a, dictum gravida erat. Maecenas enim lacus, accumsan quis pulvinar ut, cursus non felis. Fusce sit amet semper nisl.',
    bibliography: [
      'Bishop, M. C. (2012). Handbook to Roman Legionary Fortresses. Barnsley: Pen & Sword.', 
      'Clauss, M. (1992). Cultores Mithrae: Die Anhängerschaft des Mithras-Kultes. Stuttgart: Franz Steiner 1992.', 
      'Clauss, M. (2012). Mithras: Kult und Mysterium. Darmstadt – Mainz: Philipp von Zabern. Chalupa, A. (2016). The Origins of the Roman Cult of Mithras in the Light of New Evidence and Interpretations: The Current State of Affairs. Religio: Revue pro religionistiku 24(1), pp. 65-96.  Retrieved from  http://hdl.handle.net/11222.digilib/135694.',
      'Daniels, C. M. (1975). The Role of the Roman Army in the Spread and Practice of Mithraism. In J. Hinnells (Ed.), Mithraic Studies II (pp. 249-274). Manchester: Manchester University Press.',
      'Gordon, R. L. (2009). The Roman Army and the Cult of Mithras: A Critical View. In C. Wolff  & Y. Le Bohac (Eds.), L’armée romaine et la religion sous le Haut­ Empire romain: Actes du quatrième Congrès de Lyon (26-­28 octobre 2006) (pp. 379-450).  Lyon: De Boccard 2009.',
      'Martin, L. H. (2006). The Roman Cult of Mithras: A Cognitive Perspective. Religio: Revue pro religionistiku 14(2), pp. 131-146. Retrieved from http://hdl.handle.net/11222.digilib/125169.',
      'Vermaseren, M. J. (1956-1960). Corpus Inscriptionum et Monumentorum Religionis Mithriacae. Den Hague: Martinus Nijhoff.'
    ],
    cartographicContext: 'Quisque ut pulvinar dui. Phasellus a orci faucibus, consectetur est ac, facilisis nisi. Duis scelerisque, nisi nec tempor interdum, erat justo lacinia tellus, at iaculis libero odio vitae velit. Integer lobortis congue faucibus. Donec luctus eros vel justo dignissim ornare. In in commodo mi, quis ultrices purus. Nunc rutrum porttitor ex eget malesuada. Proin molestie venenatis porta. Aliquam metus mi, mollis a arcu a, dictum gravida erat. Maecenas enim lacus, accumsan quis pulvinar ut, cursus non felis. Fusce sit amet semper nisl.',
    label: 'Cult of Mithra',
    originLatLng: [40,20],
    originZoom: 5,
  },
  'ISIS': {
    dataFiles: [
      {path: 'isis_temples', type: 'geojson', name: 'isis_temples'},
      {path: 'isis_artefacts', type: 'geojson', name: 'isis_artefacts'},
    ],
    label: 'Egyptian gods 3 century BCE',
    infoHeading: 'Spatial Dissemination of Egyptian gods 3 century BCE',
    infoSubHeading: 'Temples of egyptian gods - concentric circles',
    historicalContext: 'Early in the Ptolemaic era (ca 305 - 167 BCE), the Egyptian cults spread successfully to the ports of the ancient Mediterranean and subsequently further to the mainland. Goddess Isis and her divine husband Sarapis became the most popular Egyptian deities in the ancient Mediterranean. However, their cult outside Egypt was often accompanied by artifacts referencing to other Egyptian deities such as Osiris (also brother/husband of Isis), Anubis, Apis or Horus. Visualizing the spatial dissemination of the archaeological evidence connected to different Egyptian deities in the ancient Mediterranean can uncover spatial/regional patterns preferring some deities more than others. This type of visual analysis can point a historian to a previously omitted direction of research.',
    bibliography: [
      'Bricault, L. (2005). Recueil des inscriptions concernant les cultes isiaques: RICIS. Paris: Académie des inscriptions et belles-lettres.'
    ],
    cartographicContext: 'Aliquam congue dolor vitae velit imperdiet, at pharetra nisl fermentum. Curabitur vitae justo nunc. Mauris imperdiet tellus sapien, vitae dictum lacus maximus non. Suspendisse volutpat bibendum nunc nec facilisis. Etiam quis ipsum posuere, semper diam rutrum, aliquet orci. Vivamus dictum ullamcorper orci. Duis molestie ante in enim ornare mollis. Integer congue pharetra nunc id porta. Suspendisse placerat congue nisi, vel semper nulla mattis in. Ut commodo sit amet ipsum sed tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sed hendrerit ligula. Praesent euismod diam nunc, tristique iaculis leo auctor id. Mauris eu dolor volutpat, laoreet mi ac, venenatis lacus. Donec rutrum justo at consectetur scelerisque.',
    originLatLng: [35,25],
    originZoom: 6,
  },
  'MARLUC': {
    dataFiles: [
      {path: 'synagogues', type: 'geojson', name: 'synagogues'},
      {path: 'congregates', type: 'geojson', name: 'congregates'}
    ],
    infoHeading: 'Early christian congregates and jewish synagogues',
    infoSubHeading: 'Early christian congregates and jewish synagogues',
    historicalContext: 'Nullam id bibendum ligula. Vivamus posuere tortor lorem, a hendrerit ipsum luctus sit amet. Etiam lectus tortor, posuere eu tortor non, blandit vehicula lacus. Mauris urna quam, semper ut ex quis, pharetra vulputate velit. Integer et augue ut arcu convallis ultricies. Vestibulum fermentum ornare nisi, vel lacinia eros convallis vel. Proin tristique metus id nisl convallis, lobortis accumsan sem vehicula. Ut varius massa at ligula ullamcorper, ut fringilla leo egestas.',
    bibliography: [
      'Van der Meer, Frederik, and Christine Mohrmann. Atlas of the Early Christian World. Nelson, 1958.', 
      'Runesson, Anders, Donald D. Binder, and Birger Olsson, eds. The ancient synagogue from its origins to 200 CE: a source book. Vol. 72. Brill, 2008.'
    ],
    cartographicContext: 'Nullam id bibendum ligula. Vivamus posuere tortor lorem, a hendrerit ipsum luctus sit amet. Etiam lectus tortor, posuere eu tortor non, blandit vehicula lacus. Mauris urna quam, semper ut ex quis, pharetra vulputate velit. Integer et augue ut arcu convallis ultricies. Vestibulum fermentum ornare nisi, vel lacinia eros convallis vel. Proin tristique metus id nisl convallis, lobortis accumsan sem vehicula. Ut varius massa at ligula ullamcorper, ut fringilla leo egestas.',
    label: 'Christian congregates',
    originLatLng: [32,25],
    originZoom: 5,
  },
}

module.exports = MapTopics
