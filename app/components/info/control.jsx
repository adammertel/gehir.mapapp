import React from 'react'
import Styles from '../../enums/styles'
import MapTopics from '../../enums/maptopics'
import Actions from '../../enums/actions'
import Slider from 'material-ui/Slider'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

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

    handleChange (topic, option, e, value) {
      this._addNewPosponedChange(topic, option, value)
    }

    handleChangeAndRun (topic, option, e, value) {
      this._addNewPosponedChange(topic, option, value)
      setTimeout( () => this.handleRunChange(), 100)
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
              min={0} max={100000} step={10000} 
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
              min={0} max={100000} step={10000} 
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
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()}>
              {'synagogues build before year: '}<b>{this._getActualOptionValue('marluc', 'synagogueDateBefore')}</b>
            </div>
            <Slider 
              min={-200} max={400} step={10} 
              value={appState.controlOptions.marluc.synagogueDateBefore}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'marluc', 'synagogueDateBefore')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>

          <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'christrian congregates: '}<b></b>
          </div>
          <RadioButtonGroup 
            style={Styles["INFO_CONTROL_RADIO_WRAPPER"]()} name="congregatesYear" 
            valueSelected={this._getActualOptionValue('marluc', 'congregatesYear')}
            onChange={this.handleChangeAndRun.bind(this, 'marluc', 'congregatesYear')}
          >
            <RadioButton
              value="100"
              label="before year 100"
            />
            <RadioButton
              value="200"
              label="before year 200"
            />
            <RadioButton
              value="304"
              label="before year 304"
            />
          </RadioButtonGroup>
        </div>
      )
    }

    visualiseChristrome() {
      return (
        <div>
          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'church radius: '}<b>{this._getActualOptionValue('christrome', 'churchRadius')}</b>{'km'}
            </div>
            <Slider 
              min={30} max={120} step={10} 
              value={appState.controlOptions.christrome.churchRadius}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'christrome', 'churchRadius')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>
          
          <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'church influence mode: '}<b></b>
          </div>
          <RadioButtonGroup 
            style={Styles["INFO_CONTROL_RADIO_WRAPPER"]()} name="christromeMode" 
            valueSelected={this._getActualOptionValue('christrome', 'mode')}
            onChange={this.handleChangeAndRun.bind(this, 'christrome', 'mode')}
          >
            <RadioButton
              value="regions"
              label="voronoi polygons"
            />
            <RadioButton
              value="radii"
              label="regular church radii"
            />
          </RadioButtonGroup>

        </div>
      )
    }

    visualiseMithorig() {
      return (
        <div>
          <div style={Styles["INFO_CONTROL_INPUT_WRAPPER"]()}>
            <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
              {'grid cell size: '}<b>{this._getActualOptionValue('mithorig', 'gridSize')}</b>{'km'}
            </div>
            <Slider 
              min={3000} max={10000} step={1000} 
              value={appState.controlOptions.mithorig.gridSize}
              style={Styles['INFO_CONTROL_INPUT']()} 
              onChange={this.handleChange.bind(this, 'mithorig', 'gridSize')}
              onDragStop={this.handleRunChange.bind(this)}
            />
          </div>
          
          <div style={Styles['INFO_CONTROL_INPUT_LABEL']()} >
            {'confidence categories of mithraeic places: '}
          </div>
          <Checkbox
            label="Dubious"
            checked={appState.controlOptions.mithorig.dubious}
            labelPosition="right"
            style={Styles['INFO_CONTROL_CHECKBOX']()}
            onCheck={this.handleChangeAndRun.bind(this, 'mithorig', 'dubious')}
          />
          <Checkbox
            label="Probable"
            labelPosition="right"
            style={Styles['INFO_CONTROL_CHECKBOX']()}
            checked={appState.controlOptions.mithorig.probable}
            onCheck={this.handleChangeAndRun.bind(this, 'mithorig', 'probable')}
          />
          <Checkbox
            label="Definitive"
            labelPosition="right"
            style={Styles['INFO_CONTROL_CHECKBOX']()}
            checked={appState.controlOptions.mithorig.definitive}
            onCheck={this.handleChangeAndRun.bind(this, 'mithorig', 'definitive')}
          />
        </div>
      )
    }

    render () {
      return (
        <div style={Styles['INFO_CONTROL']()}>
          {
            this.renderTopic()
          }
        </div>
      );
    }
}
