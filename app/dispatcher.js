import Actions from './enums/actions.js'
import Base from './base.js'


module.exports = {
    dispatch: function (action, data) {
        console.log('dispatching', action)

        let changes = {}

        switch (action) {

            case Actions['MAP_TOPIC_CHANGE']:
                changes.activeMapTopic = data.newTopic

                var activeMapTopic = Base.getMapTopicById(data.newTopic)
                changes.mapZoom = activeMapTopic.originZoom
                changes.mapCenter = activeMapTopic.originLatLng
                changes.infoOpen = false
                break

            case Actions['MAP_BASE_LAYER_CHANGE']:
                changes.activeBaseLayer = data.newBaseLayer
                break

            case Actions['MAP_OVERLAY_TOGGLE']:
                changes.activeOverlays = appState.activeOverlays.slice()
                let overlayIndex = changes.activeOverlays.indexOf(data.overlayToToggle)

                if (overlayIndex == -1) {
                    changes.activeOverlays.push(data.overlayToToggle)
                } else {
                    changes.activeOverlays.splice(overlayIndex, 1)
                }
                break

            case Actions['MAP_CHANGE_ZOOM']:
                changes.mapZoom = data.newMapZoom
                break

            case Actions['MAP_CHANGE_CENTER']:
                changes.mapCenter = data.newMapCenter
                break

            case Actions['CONTROL_CHANGE']:
                changes.controlOptions = appState.controlOptions
                changes.controlOptions[data.topic][data.option] = data.value
                window['newwRefreshMap'] = true
                break

            case Actions['MODAL_CLOSE']:
                changes.modal = false
                break

            case Actions['MODAL_OPEN']:
                changes.modal = true
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