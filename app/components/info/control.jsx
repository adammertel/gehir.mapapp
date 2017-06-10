import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'
import Actions from '../../enums/actions'
import Slider from 'material-ui/Slider'

export default class InfoLegend extends React.Component {
    constructor (props) {
      super(props)

      this.postponeTime = 1000

      this.state = {
        postponedDispatch: false,
        postponedChanges: []
      }
    }

    _getActualOptionValue (topic, option) {
      const postponedValue = this.state.postponedChanges.find(change => change.topic === topic && change.option === option)
      return postponedValue ? postponedValue.value : appState.controlOptions[topic][option]
    }

    _addNewPosponedChange (topic, option, value) {
      const postponedC = this.state.postponedChanges.slice()
      const postponedCF = postponedC.filter(change => change.topic !== topic || change.option !== option)
      postponedCF.push({topic: topic, option: option, value: value})
      this.setState({postponedChanges: postponedCF})
    }

    handleChange (topic, option, e, value) {
      this._addNewPosponedChange(topic, option, value)

      if (this.state.postponedDispatch === false){
        setTimeout( () => {
          this.state.postponedChanges.map(change => {
            dispatcher.dispatch(Actions['CONTROL_CHANGE'], change)
            this.setState({
              postponedChanges: [],
              postponedDispatch: false
            })
          })
        }, this.postponeTime)
        this.setState({postponedDispatch: true}) 
      }
    }

    renderTopic () {
      const topic = appState.activeMapTopic
      
      switch (topic) {

        case MapTopics['ISIS'].label:
          return this.visualiseIsis()
          break

        case MapTopics['MARLUC'].label:
          return this.visualiseMarluc()
          break

        case MapTopics['CHRISTROME'].label:
          return this.visualiseChristrome()
          break

        case MapTopics['MITHORIG'].label:
          return this.visualiseMithorig()
          break
        }
    }

    visualiseIsis() {
      return (
        <div>
          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <Slider 
              min={10000} max={100000} step={10000} 
              value={appState.controlOptions.isis.artefactDistance} 
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'isis', 'artefactDistance')}
            />
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >{this._getActualOptionValue('isis', 'artefactDistance')}</div>
          </div>
          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <Slider 
              min={10000} max={100000} step={10000} 
              value={appState.controlOptions.isis.templeDistance}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'isis', 'templeDistance')}
            />
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >{this._getActualOptionValue('isis', 'templeDistance')}</div>
          </div>
        </div>
      )
    }

    visualiseMarluc() {
      return (
        <div>ahoj</div>
      )
    }

    visualiseChristrome() {
      return (
        <div>ahoj</div>
      )
    }

    visualiseMithorig() {
      return (
        <div>ahoj</div>
      )
    }

    render () {
      var that = this;
      return (
        <div style={Styles['INFO_CONTROL']()}>
          <h4 style={Styles['HEADER4']()}>CONTROL</h4>
            {
              this.renderTopic()
            }
        </div>
      );
    }
}
