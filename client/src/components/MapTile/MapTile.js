import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapTile = ({ center, config }) => (
  <div style={{ height: config.height + 'px', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDL619YAcM88PzvrklYZPl6BVOJHPH83TQ' }}
      center={center}
      defaultZoom={15}>
    </GoogleMapReact>
  </div>
);

export default MapTile;
