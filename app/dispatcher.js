import Actions from './enums/actions.js'

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
                break

            case Actions['MAPBASELAYERCHANGE']:
                changes.activeBaseLayer = data.newBaseLayer
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