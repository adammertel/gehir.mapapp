import React from 'react'
import Base from '../base'
import Styles from '../enums/styles'
import MapTopics from '../enums/maptopics'
import Actions from '../enums/actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class ModalContainer extends React.Component {
    
    constructor (props) {
      super(props)
    }

    _welcomeContent() {
      return (
        <div style={Styles['MODAL_WELCOMETEXT']()} >
          Welcome to the map application dedicated to the <a style={Styles['LINK']()} target="_blank" href="http://gehir.phil.muni.cz">gehir project</a>
        </div>
      )
    }

    _topicContent () {
      const topic = Base.getActiveMapTopic()
      return (
        <div>
          <h4 style={Styles['HEADER4']()}>Historical context</h4>
          {topic.historicalContext}
          <h4 style={Styles['HEADER4']()}>Cartographic context</h4>
          {topic.cartographicContext}
        </div>
      )
    }

    _content () {
      return appState.modal === 'welcome' ? this._welcomeContent() : this._topicContent()
    }

    _title() {
      return appState.modal === 'welcome' ? this._titleWelcome() : this._titleTopic()
    }

    _titleWelcome () {
      return 'WELCOME TO GEHIR MAP APPLICATION'
    }

    _titleTopic () {
      return Base.getActiveMapTopic().infoHeading
    }

    _handleClose = () => {
      dispatcher.dispatch(Actions['MODAL_CLOSE'], {})
    }

    render () {
      console.log(appState.modal)
      const actions = [
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this._handleClose}
          onClick={this._handleClose}
        />,
      ];

      const title = this._title()
      const content = this._content()
      console.log(content)
      return (
        <div style={Styles['MODAL_WRAPPER']()}>
          <RaisedButton label="Alert" onTouchTap={this.handleOpen} />
          <Dialog
            actions={actions}
            modal={false}
            title={title}
            open={appState.model !== false}
            onRequestClose={this._handleClose}
            titleStyle={Styles['MODAL_TITLE']()}
            style={Styles['MODAL']()}
          >
          {
            content
          }
          </Dialog>
        </div>
      );
    }
}
