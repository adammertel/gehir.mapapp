var MapStyles = {
    isis: {
        deitiesColors: {
            'Isis': '#377eb8',
            'Sarapis': '#4daf4a',
            'Apis': '#e41a1c',
            'Anubis': '#e41a1c',
            'Osiris': '#e41a1c',
            'Horus': '#e41a1c',
            'Arsinoe II': '#e41a1c',
            'Harpocrates': '#e41a1c',
        }
    },
    christrome: {
        colors: {
            1: '#ffeda0', 
            2: '#feb24c',
            3: '#f03b20', 
            0: 'lightgrey' 
        },
        buffer: (group) => {
            return {
                fillOpacity: 0.4, 
                color: group.color, 
                fillColor: group.color,
                weight: 0.5
            }
        },
        region: (color) => {
            return {
                opacity: 1, 
                fillOpacity: .6, 
                weight: .5, 
                color: 'white', 
                fillColor: color
            }
        } 
    },
    marluc: {
        synagogueColors: ['#feb24c','#fd8d3c','#f03b20','#bd0026'],
        congregateColors: ['#bdc9e1','#67a9cf','#1c9099','#016c59'],
        congregateOpacity: 0.35,
        synagogueOpacity: 0.7,
    },
    mithorig: {
        mithraicColors: ['#d7191c','#fdae61','#a6d96a','#1a9641'],
        fortColors: ['#cbc9e2','#9e9ac8','#756bb1','#54278f'],
        placeOpacity: 0.7,
        fortOpacity: 0.35,
    }
}

module.exports = MapStyles