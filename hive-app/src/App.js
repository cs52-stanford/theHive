import React, {Component, Text} from 'react';
import GoogleMap from 'google-map-react';
import {
  initialCenter,
  initialZoom,
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
import Marker from './marker.js';
import PropTypes from 'prop-types';
import {markerList} from './data/markerData'

class SimpleMap extends Component {
  static defaultProps = {
    center: initialCenter,
    zoom: initialZoom
  };

  static propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  };


  render() {
    console.log("woot");
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
          apiKey={'AIzaSyDXoh9xjEP-dJLfTkwYPPKUQzWe51npX28'}
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={M_WIDTH}
        >

          {markerList.map((marker, index) => (
            // <a href="https://google.com">
              <Marker
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                text={index}
                handle={marker.handle}>
              </Marker>
            // </a>
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default SimpleMap;
