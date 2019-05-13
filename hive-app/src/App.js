import React, {Component, Fragment} from 'react';
import GoogleMap from 'google-map-react';
import {
  initialCenter,
  initialZoom,
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
import Marker from './marker.js';
import PropTypes from 'prop-types';

// consts
import {markerList} from './data/markerData';

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
  const bounds = getMapBounds(map, maps, markerList);
  // Fit map to bounds
  // map.fitBounds(bounds);

  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

class SimpleMap extends Component {
  static defaultProps = {
    // center: initialCenter,
    // zoom: initialZoom
  };

  static propTypes = {
    // center: PropTypes.array,
    // zoom: PropTypes.number,

    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn
  };

  _onChildClick = (map, marker, maps) => {
    this.setState({
      center: [marker.lat, marker.lng],
      activeMarkerIndex: marker.index, // key can't be passed as a prop
    });

}
  constructor(props) {
    super(props);
    this.state = {
      activeMarkerIndex: null,
      center: initialCenter,
      zoom: initialZoom,
      places: null,
      maps: null,
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyDXoh9xjEP-dJLfTkwYPPKUQzWe51npX28'}}
          center={this.state.center}
          zoom={this.state.zoom}
          hoverDistance={M_WIDTH}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, markerList)}
          onChildClick={this._onChildClick}
          // onChildMouseLeave={this._onChildMouseLeave}
        >

          {markerList.map((marker, index) => (
              <Marker
                key={index}
                index={index}
                activeMarkerIndex={this.activeMarkerIndex}
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
