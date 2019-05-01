import React, {Component } from 'react';
import GoogleMap from 'google-map-react';

import {
  initialCenter,
  initialZoom,
  M_WIDTH,
  M_HEIGHT,
} from './numbers'
import Marker from './marker.js';
import PropTypes from 'prop-types';


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
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
          apiKey={'AIzaSyDXoh9xjEP-dJLfTkwYPPKUQzWe51npX28'}
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={M_WIDTH / 2}
        >
          <Marker lat={initialCenter[0]} lng={initialCenter[1]} text={'1'} /* Kreyser Avrora */ />
        </GoogleMap>
      </div>
    );
  }
}

export default SimpleMap;
