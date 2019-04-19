import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class MapTile extends Component {

  render() {
    console.log(this.props.center);
    return (
      <div style={{ height: '320px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDL619YAcM88PzvrklYZPl6BVOJHPH83TQ' }}
          defaultCenter={this.props.center}
          defaultZoom={15}
        >
        </GoogleMapReact>
      </div>
    );
  }
}