import React from 'react'

export default class InfoText extends React.Component {

    infoTextStyle () {
      return ({
        fontWeight: 200,
        position: 'relative',
        top: '50px',
        marginLeft: '10px'
      })
    }


    render () {
      var that = this;
      return (
        <div style={this.infoTextStyle()}>
          {this.props.text}
        </div>
      );
    }
}
