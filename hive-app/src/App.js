import React, {Component, Fragment} from 'react';
import GoogleMap from 'google-map-react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {
  initialCenter,
  initialZoom,
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
import Marker from './marker.js';
import PropTypes from 'prop-types';
import InfluenceFlag from './influenceFlag.js';
import TableEntry from './TableEntry.js';
import { SearchBox } from 'react-instantsearch-dom';
import './fonts.css'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed } from 'react-twitter-embed';


// consts
import {markerList} from './data/markerData';
var finalData = markerList;

const makeData = () => {
  //use this code to fetch
  //replace console.log(data) with whatever you need to convert data to the display
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
      // firstPass.append(Object.values(data.macro));
      // firstPass.append(Object.values(data.mid));
      // firstPass.append(Object.values(data.micro));
      console.log('returned data from makeData: ', starA);

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

// Return map bounds based on list of places
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

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, finalData, e) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, finalData);
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
      // activeMarkerIndex: marker.index, // key can't be passed as a prop
      activeMarker: marker.marker,
    });
    // console.log(this.state.data);
  }

  constructor(props) {
    super(props);
    this.state = {
      // activeMarkerIndex: null,
      activeMarker: "",
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
      // Important! Always set the container height explicitly
      // <div style={{ height: '100vh', width: '100%' }}>
      <div>
      { this.state && this.state.data &&
        <SplitterLayout
        primaryIndex={1}
        primaryMinSize={window.innerWidth*0.2}
        // restrict table size to 25% only
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
                    // activeMarkerIndex={this.state.activeMarkerIndex}
                    activeMarker = {this.state.activeMarker}
                    lat={marker['Latitude']}
                    lng={marker['Longitude']}
                    text={(Math.round(marker['Influencer-Score']*1)).toString()}
                    hover={this.props.hoverKey === index}
                    marker={marker}
                    >
                  </Marker>
              ))}
            </GoogleMap>
          </div>

          {/* sidebar */}
          <div>
          {this.state.activeMarker.Handle}
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="RealErinCruz"
            options={{height: 320}}
            activeMarker = {this.state.activeMarker}
          />
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
