import Actions from './enums/actions.js'
import Base from './base.js'


module.exports = {
    dispatch: function (action, data) {
        console.log('dispatching', action)

        let changes = {}

        switch (action) {
            case Actions['INFOTOGGLE']:
                changes.infoOpen = !appState.infoOpen
                break

            case Actions['MAPTOPICCHANGE']:
                changes.activeMapTopic = data.newMapMode

                var activeMapTopic = Base.getMapTopicById(data.newMapMode)
                changes.mapZoom = activeMapTopic.originZoom
                changes.mapCenter = activeMapTopic.originLatLng
                break

            case Actions['MAPBASELAYERCHANGE']:
                changes.activeBaseLayer = data.newBaseLayer
                break

            case Actions['MAPOVERLAYTOGGLE']:
                changes.activeOverlays = appState.activeOverlays.slice()
                let overlayIndex = changes.activeOverlays.indexOf(data.overlayToToggle)

                if (overlayIndex == -1) {
                    changes.activeOverlays.push(data.overlayToToggle)
                } else {
                    changes.activeOverlays.splice(overlayIndex, 1);
                }
                break

            case Actions['MAPCHANGEZOOM']:
                changes.mapZoom = data.newMapZoom
                break

            case Actions['MAPCHANGECENTER']:
                changes.mapCenter = data.newMapCenter
                break
        }

        this.setAppState(changes)
    },

    setAppState: function (stateChanges) {
        console.log(stateChanges)
        appState = Object.assign({}, appState, stateChanges)
        window['appUpdate']()
    }
}