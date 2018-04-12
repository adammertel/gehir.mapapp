import React from 'react';
import Base from '../base';
import Styles from '../enums/styles';
import MapTopics from '../enums/maptopics';
import Actions from '../enums/actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  _welcomeContent() {
    return (
      <div style={Styles['MODAL_WELCOMETEXT']()}>
        <p key="1">
          This application is dedicated to the spatial visualisation of research
          outcomes of the{' '}
          <a
            style={Styles['LINK']()}
            target="_blank"
            href="http://gehir.phil.muni.cz"
          >
            GEHIR project
          </a>
        </p>
        <p key="2">
          Its aim is twofold - to showcase the chosen results of the project and
          to offer an accessible overview of the methods used in spatial visual
          analysis at the same time.
        </p>
        <p key="3">
          The content is organised according to three research case studies of
          three ancient mediterranean religious traditions: Christianity,
          Mithraism and cults of Egyptian Gods during the Ptolemaic era. Each
          case study in the application is a macrohistorical map of selected
          spatio-temporal traces of given religious tradition in the light of
          specific research problem. Each map is accompanied by textual
          description of historical and cartographical context.
        </p>
        <p key="4">
          Thank you for your interest and please feel free to give us any
          <a
            style={Styles['LINK']()}
            target="_blank"
            href="mailto:gehirproject@gmail.com"
          >
            {' feedback'}
          </a>!
        </p>
      </div>
    );
  }

  _topicContent() {
    const topic = Base.getActiveMapTopic();
    return (
      <div>
        <h4 style={Styles['HEADER4']()}>Data</h4>
        {topic.uploadedData.map((data, di) => {
          return (
            <p key={di} style={{ marginTop: 0, marginBottom: 5 }}>
              <span> - </span>
              <a href={data.url} style={Styles['LINK']()}>
                {data.label}
              </a>
            </p>
          );
        })}

        <h4 style={Styles['HEADER4']()}>Historical context</h4>
        {topic.historicalContext}

        <h4 style={Styles['HEADER4']()}>Cartographic context</h4>
        {topic.cartographicContext}

        <h4 style={Styles['HEADER4']()}>Bibliography and data sources</h4>
        {topic.bibliography.map((bibl, bi) => {
          return (
            <p key={bi} style={{ marginTop: 0, marginBottom: 5 }}>
              - {bibl}
            </p>
          );
        })}
      </div>
    );
  }

  _content() {
    return appState.modal === 'welcome'
      ? this._welcomeContent()
      : this._topicContent();
  }

  _title() {
    return appState.modal === 'welcome'
      ? this._titleWelcome()
      : this._titleTopic();
  }

  _titleWelcome() {
    return 'WELCOME TO GEHIR MAP APPLICATION';
  }

  _titleTopic() {
    return Base.getActiveMapTopic().infoHeading;
  }

  _handleClose() {
    dispatcher.dispatch(Actions['MODAL_CLOSE'], {});
  }

  render() {
    const actions = [
      <FlatButton label="Close" primary={true} onClick={this._handleClose} />
    ];

    const title = this._title();
    const content = this._content();
    return (
      <div style={Styles['MODAL_WRAPPER']()}>
        <RaisedButton label="Alert" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          title={title}
          open={appState.model !== false}
          onRequestClose={this._handleClose}
          titleStyle={Styles['MODAL_TITLE']()}
          bodyStyle={Styles['MODAL']()}
        >
          {content}
        </Dialog>
      </div>
    );
  }
}
