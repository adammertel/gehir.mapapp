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

    handleChange (topic, option, e, value, run = false) {
      this._addNewPosponedChange(topic, option, value)
      if (run) this.handleRunChange()
    }

    handleRunChange () {
      this.state.postponedChanges.map(change => {
        dispatcher.dispatch(Actions['CONTROL_CHANGE'], change)
        this.setState({
          postponedChanges: []
        })
      })
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
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'temples range: '}<b>{this._getActualOptionValue('isis', 'templeDistance')/1000}</b>{'km'}
            </div>
            <Slider 
              min={30000} max={100000} step={10000} 
              value={appState.controlOptions.isis.templeDistance}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'isis', 'templeDistance')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>

          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()}>
              {'artefacts range: '}<b>{this._getActualOptionValue('isis', 'artefactDistance')/1000}</b>{'km'}
            </div>
            <Slider 
              min={0} max={70000} step={10000} 
              value={appState.controlOptions.isis.artefactDistance} 
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'isis', 'artefactDistance')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>

          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'opacity-decrease coefficient: '}<b>{this._getActualOptionValue('isis', 'opacityDecrease')}</b>{}
            </div>
            <Slider 
              min={0.5} max={1.5} step={0.1} 
              value={appState.controlOptions.isis.opacityDecrease}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'isis', 'opacityDecrease')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>
        </div>
      )
    }

    visualiseMarluc() {
      return (
        <div>
          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'synagogues build after: '}<b>{this._getActualOptionValue('marluc', 'synagogueDateAfter')}</b>{' year'}
            </div>
            <Slider 
              min={-200} max={400} step={10} 
              value={appState.controlOptions.marluc.synagogueDateAfter}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'marluc', 'synagogueDateAfter')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>
          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'synagogues build before: '}<b>{this._getActualOptionValue('marluc', 'synagogueDateBefore')}</b>{' year'}
            </div>
            <Slider 
              min={-200} max={400} step={10} 
              value={appState.controlOptions.marluc.synagogueDateBefore}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'marluc', 'synagogueDateBefore')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>
        </div>
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
