import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../MapMarker/MapMarker';

const MapTile = ({ center, config }) => {
  return (
    <div style={{ height: config.height + 'px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDL619YAcM88PzvrklYZPl6BVOJHPH83TQ' }}
        center={center}
        defaultZoom={14}
        options={{draggable: false}}>
        <MapMarker
          lat={center.lat}
          lng={center.lng}
          text='Charles the Fourth'
        />
      </GoogleMapReact>
    </div>);
};

export default MapTile;
