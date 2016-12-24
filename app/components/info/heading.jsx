import React from 'react'

export default class InfoHeading extends React.Component {

    infoTextStyle () {
      return ({
        marginLeft: '10px',
        fontWeight: 400,
        position: 'relative',
        top: '15px'
      })
    }


    render () {
      var that = this;
      return (
        <div style={this.infoTextStyle()}>
          {this.props.headingText}
        </div>
      );
    }
}
