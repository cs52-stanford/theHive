import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import Config from '../../../Config';
import {data} from './data.js'

const mapStyles = {
  flex: 1,
};

const tableStyle = {
  flex: 1,
};

const pageStyle = {
  // width: '100%',
  // height: '100%',
  flexDirection: 'row',
  flex: 1
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div
        style={pageStyle}
      >
        <Map
          google={this.props.google}
          zoom={5}
          style={mapStyles}
          initialCenter={{
           lat: 39,
           lng: -95.7129
         }}>
          <Marker
           onClick={this.onMarkerClick}
           name={'Kansas City'}
           shadowColor = 'green'
           position={{
            lat: 39.110298,
            lng: -94.581078
          }} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>

        <div
          style={tableStyle}>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXoh9xjEP-dJLfTkwYPPKUQzWe51npX28'
})(MapContainer);
