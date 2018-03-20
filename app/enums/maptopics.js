import StyleVariables from './stylevariables';

var MapTopics = {
  MITHORIG: {
    bibliography: [
      'Andrienko, G., Andrienko, N., & Denisovich, I. (2004). Dynamic aggregation on grids for interactive analysis of multidimensional spatial information. Lecture Notes in Proceedings AGILE, 207-212.',
      'Andrienko, N., & Andrienko, G. (2006). Exploratory analysis of spatial and temporal data: a systematic approach. Springer Science & Business Media.',
      'Carr, D. B., Olsen, A. R., & White, D. (1992). Hexagon mosaic maps for display of univariate and bivariate geographical data. Cartography and Geographic Information Systems, 19(4), 228-236.',
      'Bishop, M. C. (2012). Handbook to Roman Legionary Fortresses. Barnsley: Pen & Sword.',
      'Chalupa, A. (2016). The origins of the Roman cult of Mithras in the light of new evidence and interpretations: the current state of affairs.',
      'Clauss, M. (2012). Mithras: Kult und Mysterium. Darmstadt – Mainz: Philipp von Zabern. Chalupa, A. (2016). The Origins of the Roman Cult of Mithras in the Light of New Evidence and Interpretations: The Current State of Affairs. Religio: Revue pro religionistiku 24(1), pp. 65-96.  Retrieved from  http://hdl.handle.net/11222.digilib/135694.',
      'Daniels, C. M. (1975). The Role of the Roman Army in the Spread and Practice of Mithraism. In J. Hinnells (Ed.), Mithraic Studies II (pp. 249-274). Manchester: Manchester University Press.',
      'Gordon, R. L. (2009). The Roman Army and the Cult of Mithras: A Critical View. In C. Wolff  & Y. Le Bohac (Eds.), L’armée romaine et la religion sous le Haut­ Empire romain: Actes du quatrième Congrès de Lyon (26-­28 octobre 2006) (pp. 379-450).  Lyon: De Boccard 2009.',
      'Vermaseren, M. J. (1956-1960). Corpus Inscriptionum et Monumentorum Religionis Mithriacae. Den Hague: Martinus Nijhoff.'
    ],
    dataFiles: [
      { path: 'forts', type: 'geojson', name: 'forts' },
      { path: 'mithraea', type: 'geojson', name: 'mithraea' }
    ],
    infoHeading: 'Cult of Mithra and Military Forts',
    label: 'Mithraism',
    historicalContext:
      'Mithraism was one of many religious cults which proliferated in the society of the Roman Empire. Evidence of its existence begins to appear in historical sources, rather abruptly, in the last quarter of the 1st century CE. Mithraism especially flourished during the 2nd and 3rd century CE and disappeared in the first half of the 5th century CE, after the christianization of the Roman Empire. Although the exact scenario of Mithraic origins remains unknown (e.g. Chalupa 2016), there is evidence for the existence of strong ties between Mithraism and the Roman army (Daniels 1975; but cf. Gordon 2009). Roman soldiers are very often attested as members of the cult, and numerous Mithraic communities can be found in close proximity to the Roman legionary fortresses.',
    cartographicContext:
      'One of the most common use case of spatial visual analysis is the presentation that supports the potential to observe the spatial correlation for two specific datasets. Extended grid-based visualisation method was used beside the fact that it is primarily mostly suitable for displaying single-phenomena datasets (Andrienko, 2004) while superimposing more datasets is a challenge for visualisation (Carr, 1992). The basic idea of its extension is the possibility to represent aggregates in different graphical ways, e.g. as a fill of the grid cell or as a size of the cell-centered mark. Also, the graphical variables are possible to use to visualise different measures of the aggregate, not only the number of members (e.g. maximum value, number of members with the value smaller than x) (Andrienko, 2006). Considering these conceptions, it is possible to visualize two different datasets on  the same map while empathising specific measures to support the visual analysis. Implementation of this method provides the library Leaflet.RegularGridCluster (https://github.com/adammertel/Leaflet.RegularGridCluster). The shape of the cell is hexagonal, the color intensity of the cell represents the number of aggregated forts and centered marker indicates mithraic places.',
    originLatLng: [40, 20],
    originZoom: 5,
    uploadedData: [
      {
        label: 'mitraic_places.csv',
        url: 'http://gehir.phil.muni.cz/data/mitraic_places.csv'
      }
    ]
  },
  ISIS: {
    bibliography: [
      'Bricault, L. (2004). La diffusion isiaque: une esquisse. Städel-Jahrbuch / [Städelsches Kunstinstitut Und Städtische Galerie, Frankfurt/Main]. 548-556.',
      'Bricault, L. (2005). Recueil des inscriptions concernant les cultes isiaques: RICIS. Paris: Académie des inscriptions et belles-lettres.',
      "Dunand, F. (1980). Cultes égyptiens hors d'Egypte: essai d'analyse des conditions de leur diffusion. Paris: Les Belles Lettres.",
      'Pawlowsky-Glahn, V., & Egozcue, J. J. (2006). Compositional data and their analysis: an introduction. Geological Society, London, Special Publications, 264(1), 1-10.'
    ],
    dataFiles: [
      { path: 'isis_temples', type: 'geojson', name: 'isis_temples' },
      { path: 'isis_artefacts', type: 'geojson', name: 'isis_artefacts' }
    ],
    label: 'Egyptian Gods',
    infoHeading: 'Egyptian gods around 3rd century BCE',
    historicalContext:
      'Early in the Ptolemaic era (ca 305 - 167 BCE), the Egyptian cults spread successfully to the ports of the ancient Mediterranean and subsequently further to the mainland (e.g. Bricault 2004 and 2013; Dunand 1980). The goddess Isis and her divine husband Sarapis became the most popular Egyptian deities in the ancient Mediterranean. However, their cult outside Egypt was often accompanied by artifacts referencing other Egyptian deities such as Osiris (also brother/husband of Isis), Anubis, Apis, or Horus.',
    cartographicContext:
      'From the statistical perspective, the dataset of temples and artefacts for this case study has compositional character - each item could belong to one or more deities. And if, for example, the temple is attributed to two deities, the effect of each deity on the neighborhood is limited (50%). Then, the second factor is the distance - the impact is weaker farther from the temples. The common way to visualise compositional data in cartography is to use pie charts that are placed on the map as symbols. To be able to depict the phenomena as a continuous space and then to follow the trends in space, customized partly-opaque pie charts were adapted. This opacity increases as distance from the temple or artifact increases. The described method was then implemented as an open-source leaflet plugin named “leaflet-segment-charts”. Code is stored in the form of a GitHub repository (https://github.com/adammertel/leaflet-segments-charts). When initialising the segments charts, it is possible to choose parameters such as the angle, or the color of a segment, and the opacity decrease coefficient. It is also crucial to implement the color blending technique that sets how colors will interact if they overlay (so the top color is not prefered).\n Within the interactive part of the legend, two sliders were implemented - for choosing the maximal range of a segment, representing temple and artefact to depict the reference to a deity, the Ternary diagram was adapted as it is the ideal way to visualise the attributional space of a compositional dataset (Pawlowsky-Glahn & Egozcue, 2006).',
    originLatLng: [35, 25],
    originZoom: 6,
    uploadedData: [
      {
        label: 'isis_artefacts.csv',
        url: 'http://gehir.phil.muni.cz/data/isis_artefacts.csv'
      },
      {
        label: 'isis_temples.csv',
        url: 'http://gehir.phil.muni.cz/data/isis_temples.csv'
      }
    ]
  },
  CHRISTROME: {
    bibliography: [
      'Guo, D., & Wang, H. (2011). Automatic region building for spatial analysis. Transactions in GIS, 15(s1), 29-45.',
      'Illian, J., Penttinen, A., Stoyan, H., & Stoyan, D. (2008). Statistical analysis and modelling of spatial point patterns (Vol. 70). John Wiley & Sons.',
      'Okabe, A., Boots, B., Sugihara, K., & Chiu, S. N. (2000). Spatial Tessellations: Concepts and applications of Voronoi diagrams, John Wiley & Sons. Chichester, UK. ',
      'Van Dam, Raymond, and Ramsay MacMullen. "The Second Church: Popular Christianity AD 200–400. Writings from the Greco-Roman World Supplement Series, vol. 1." (2009): 690-692.'
    ],
    dataFiles: [
      { path: 'regions', type: 'geojson', name: 'regions' },
      { path: 'churches', type: 'geojson', name: 'churches' }
    ],
    infoHeading: 'Church Buildings 200-400 CE',
    label: 'Church Buildings',
    historicalContext:
      'While the previous case study describes the origins of christian religion, this study focuses on the next period - the 3rd and 4th century CE. During this time span, Christianity established itself in mostly urban centers of the Roman Empire. As we are informed especially by means of references in early Christian texts, Christianity flourished especially well in certain locations, where Christians erected their own buildings. Despite the fact that the information about erection, usage, or destruction of church buildings is often based on literary evidence, this information is of crucial importance, because it tends to be less prone to idealization than information about the actual number of Christians in certain locations. Therefore, this information can serve as a valuable proxy for Christian density in the location.',
    cartographicContext:
      'Most of the datasets within this study are of point-pattern type, which is one of three types of data that could be used to construct regions (Guo, 2011) - an auxiliary geometrical structure that could support statistical analysis of phenomena (Illian, 2008). One way to create regions is using a method called “Thiessen polygons” that is described e.g in Okabe (2000). This method was used for the case study “Church buildings”. The motivation was to show the spatial dissemination of christianity in the Roman Empire within three different time spans. To construct thiessen polygons from point data on-the-fly, a library turf.js (http://turfjs.org) was used. The user is able to choose the radius of the the church points. This radii are dissolved based on their temporal value and intersecting regions of these unions are checked. Each region will then take the color corresponding to the intersecting radius of the oldest churches group. The second mode was added to this map, in which there are no regions used, just the visualisation of unions of radii with the same temporal value.',
    originLatLng: [33, 20],
    originZoom: 5,
    uploadedData: [
      {
        label: 'churches.csv',
        url: 'http://gehir.phil.muni.cz/data/churches.csv'
      }
    ]
  }
};

module.exports = MapTopics;
