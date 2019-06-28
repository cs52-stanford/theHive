import React, {Component, Fragment} from 'react';
import GoogleMap from 'google-map-react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {
  initialCenter,
  initialZoom,
  M_WIDTH,
} from './data/numbers'
import Marker from './marker.js';
import PropTypes from 'prop-types';
import InfluenceFlag from './influenceFlag.js';
import TableEntry from './TableEntry.js';
import { SearchBox } from 'react-instantsearch-dom';
import './fonts.css';
import { Timeline } from 'react-twitter-widgets';

// keep track of data
import {markerList} from './data/markerData';
var finalData = markerList;

// fetch influencer info and store it in finalData
const makeData = () => {
  fetch('https://us-central1-angelic-artwork-220408.cloudfunctions.net/get-influencers', {
    method: 'GET',
    mode: 'cors',
  })
    .then(r => r.json())
    .then(function(data) {
      {/* star array */}
      var starA = Object.values(data.star);
      for (var i = 0; i < starA.length; i++) {
        starA[i].influence = "star";
      }

      {/* macro array */}
      var macroA = Object.values(data.macro);
      for (var i = 0; i < macroA.length; i++) {
        macroA[i].influence = "macro";
      }

      {/* mid array */}
      var midA = Object.values(data.mid);
      for (var i = 0; i < midA.length; i++) {
        midA[i].influence = "mid";
      }

      {/* micro array */}
      var microA = Object.values(data.micro);
      for (var i = 0; i < microA.length; i++) {
        microA[i].influence = "micro";
      }

      // combine all the arrays together in order from highest rank -> lowest
      starA = starA.concat(macroA);
      starA = starA.concat(midA);
      starA = starA.concat(microA);
      finalData = starA;
      return data;
    })
    .catch(function(error) {
      console.log(error);
      return ("error");
    });
};

// return map bounds based on list of places
const getMapBounds = (map, maps, finalData) => {
  const bounds = new maps.LatLngBounds();
  finalData.forEach((marker) => {
    bounds.extend(new maps.LatLng(
      marker.lat,
      marker.lng,
    ));
  });
  return bounds;
};

// re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, finalData, e) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, finalData);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

// abbreviates the number of followers on each marker
const convertScore = (marker) => {
  var abbreviate = require('number-abbreviate');
  if (typeof marker['Followers'] === 'string') {
    return marker['Followers'];
  } else {
    return abbreviate(Math.round(marker['Followers'])).toString();
  }
}

// style for the title
const titleStyle = {
  color: 'black',
  fontSize: 24,
  fontFamily: 'Roboto',
  padding: 15,
  fontWeight: 'bold',
};

class SimpleMap extends Component {
  static propTypes = {
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn
  };

  // when a marker is clicked, the map re-centers around it and indicates that
  // it's the active marker by enlarging
  _onChildClick = (map, marker, maps) => {
    this.setState({
      center: [marker.lat, marker.lng],
      activeMarker: marker.marker,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {
        'Handle': 'twitter',
        'User': 'No selected marker',
        'User location': 'N/A',
      },
      center: initialCenter,
      zoom: initialZoom,
      places: null,
      maps: null,
      dataIsLoaded: false,
      data: markerList,
    }
  }

  componentDidMount() {
    const self = this;
    console.log('mounted!');
    makeData(data => self.setState({ data: data, dataIsLoaded: true }));

    if(this.state.dataIsLoaded === false) {
      console.log('not yet!!');
    } else {
      console.log('now!!!');
    }
  }

  render() {
    const handle = this.state.activeMarker.Handle;
    return (
      <div>
      {/* restrict sidebar to 20% of the screen */}
      { this.state && this.state.data &&
        <SplitterLayout
        primaryIndex={1}
        primaryMinSize={window.innerWidth*0.2}
        secondaryMinSize={window.innerWidth*0.8}>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
              bootstrapURLKeys={{key: 'AIzaSyDXoh9xjEP-dJLfTkwYPPKUQzWe51npX28'}}
              center={this.state.center}
              zoom={this.state.zoom}
              hoverDistance={M_WIDTH}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, finalData)}
              onChildClick={this._onChildClick}
            >
              {(finalData).map((marker, index) => (
                  <Marker
                    key={index}
                    index={index}
                    activeMarker = {this.state.activeMarker}
                    lat={marker['Latitude']}
                    lng={marker['Longitude']}
                    text={convertScore(marker)}
                    hover={this.props.hoverKey === index}
                    marker={marker}
                    >
                  </Marker>
              ))}
            </GoogleMap>
          </div>

          {/* sidebar */}
          <div>
            <div style={titleStyle}> Selected Marker </div>

            {/* active marker entry */}
            <TableEntry
              activeMarker = {this.state.activeMarker}
              marker={this.state.activeMarker}
              >
            </TableEntry>

            {/* active marker's twitter feed */}
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: (this.state.activeMarker.Handle).toString(),
              }}
              options={{
                username: 'Twitter Widget',
                height: '400'
              }}
            />

            {/* divider */}
            <div style = {{
              border: '1px solid whitesmoke',
            }} />

            {/* influencer list */}
            <div style={titleStyle}> Influencers </div>
            {(finalData).map((marker, index) => (
                  <TableEntry
                    key={index}
                    index={index}
                    activeMarker = {this.state.activeMarker}
                    marker={marker}
                    >
                  </TableEntry>
              ))}
            </div>
        </SplitterLayout>
        }
      </div>

    );
  }
}


export default SimpleMap;
