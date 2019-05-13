import React, {Component, Fragment} from 'react';
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

// consts
import controllable from 'react-controllables';
import {markerList} from './data/markerData';

SimpleMap = controllable(['center', 'zoom', 'hoverKey', 'clickKey']);

// Return map bounds based on list of places
const getMapBounds = (map, maps, markerList) => {
  const bounds = new maps.LatLngBounds();

  markerList.forEach((marker) => {
    bounds.extend(new maps.LatLng(
      marker.lat,
      marker.lng,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, markerList) => {
  // Get bounds by our places
  this.setState({maps: maps});
  const bounds = getMapBounds(map, maps, markerList);
  // Fit map to bounds
  // map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

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
  };

  _onChildClick = (map, marker, maps) => {
    // map.fitBounds([childProps.lat, childProps.lng]);
    console.log(marker);
    this.state.maps.panTo({lat: marker.lat, lng: marker.lng});
  }

  // _onChildMouseEnter = (key /*, childProps */) => {
  //   this.props.onHoverKeyChange(key);
  // }

  // _onChildMouseLeave = (/* key, childProps */) => {
  //   this.props.onHoverKeyChange(null);
  // }

  constructor(props) {
    super(props);
    this.state = {
      activeChild: null,
      center: initialCenter,
      zoom: initialZoom,
      places: null,
      maps: null,
    }
  }

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
          bootstrapURLKeys={{key: 'AIzaSyDXoh9xjEP-dJLfTkwYPPKUQzWe51npX28'}}
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={M_WIDTH}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, markerList)}
          onChildClick={this._onChildClick}
          // onChildMouseLeave={this._onChildMouseLeave}
        >

          {markerList.map((marker, index) => (
              <Marker
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                text={index.toString()}
                handle={marker.handle}
                influence={marker.influence}
                hover={this.props.hoverKey === index}
                >
              </Marker>
            // </a>
          ))}

        </GoogleMap>
      </div>
    );
  }
}



export default SimpleMap;
