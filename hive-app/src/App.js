import React, {Component } from 'react';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';

import {
  initialCenter,
  initialZoom,
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
import Marker from './marker.js';
import PropTypes from 'prop-types';
import {markerList} from './data/markerData'

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

class SimpleMap extends Component {
  static defaultProps = {
    center: initialCenter,
    zoom: initialZoom
    //   greatPlaces: [
    //     {id: 'A', lat: 59.955413, lng: 30.337844},
    //     {id: 'B', lat: 59.724, lng: 30.080}
    //   ]
  };

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn
    greatPlaces: PropTypes.array
  };


    //should we define shouldPureComponentUpdate????????????
    // shouldComponentUpdate = shouldPureComponentUpdate;


    constructor(props) {
      super(props);
    }

    _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
      this.props.onCenterChange(center);
      this.props.onZoomChange(zoom);
    }

    _onChildClick = (key, childProps) => {
      this.props.onCenterChange([childProps.lat, childProps.lng]);
    }

    _onChildMouseEnter = (key /*, childProps */) => {
      this.props.onHoverKeyChange(key);
    }

    _onChildMouseLeave = (/* key, childProps */) => {
      this.props.onHoverKeyChange(null);
    }

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

          // controllables library for hovering over marker
          onBoundsChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
        >

          {markerList.map((marker, index) => (
            // <a href="https://google.com">
              <Marker
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                text={index}
                handle={marker.handle}
                influence={marker.influence}
                hover={this.props.hoverKey === index}> //hover marker
              </Marker>
            // </a>
          ))}

        </GoogleMap>
      </div>
    );
  }
}



export default SimpleMap;
