import React, { Component } from 'react';

export default class MapTile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      map: null,
      marker: null
    };
  }

  componentDidMount() {
    this.setState({
      map: new window.google.maps.Map(this.refs.map, {
        zoom: 16,
        center: {
          lat: this.props.lat,
          lng: this.props.lng
        },
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      })
    });
  }

  render() {
    const map = this.state.map;
    if (map) {
      const position = new window.google.maps.LatLng(this.props.lat, this.props.lng);
      if (map.center && map.center.lng() === 0 && map.center.lat() === 0 && this.props.lat !== 0 && !this.props.lng !== 0) {
        map.setCenter(position);
      }
      
      if (this.props.lat !== 0 && this.props.lng !== 0) {
        // eslint-disable-next-line
        this.state.marker = new window.google.maps.Marker({
          position: position,
          map: map,
          title: 'Charles 4th'
        });
      }
    }
    return <div ref="map" style={{height: '355px', width: '860px', cursor: 'pointer'}}/>;
  }
}