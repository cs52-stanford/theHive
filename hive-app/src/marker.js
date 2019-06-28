// Component for map marker
// Given an influencer, displays their location and influencer level, as well
// as their abbreviated follower count
// On hover, the marker enlarges and on click, the map re-centers around it
// and updates the active marker

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  M_WIDTH,
  MICRO_COLOR,
  MID_COLOR,
  MACRO_COLOR,
  STAR_COLOR,
} from './data/numbers'


// marker style for STAR influencers
const starMarkerStyle = {
  position: 'absolute',
  width: M_WIDTH,
  height: M_WIDTH,
  left: -M_WIDTH / 2,
  top: -M_WIDTH / 2,

  border: '5px solid #ecbf42',
  borderRadius: M_WIDTH,
  backgroundColor: STAR_COLOR,
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  color: 'white',
  fontSize: 12,
  fontWeight: 'bold',
  padding: 4,
};

// marker style on hover
const markerStyleHover = {
  ...starMarkerStyle,
  border: '5px solid black',
  color: 'black',
  backgroundColor: 'white',
  borderRadius: 50,
  width: M_WIDTH*2,
  height: M_WIDTH*2,
  left: -M_WIDTH*2/ 2,
  top: -M_WIDTH*2 / 2,
  zIndex: 1,
};

const microMarkerStyle = {
  ...starMarkerStyle,
  backgroundColor: MICRO_COLOR,
  borderColor: MICRO_COLOR,
  color: 'black',
}

const midMarkerStyle = {
  ...starMarkerStyle,
  backgroundColor: MID_COLOR,
  borderColor: MID_COLOR,
  color: 'black',
}

const macroMarkerStyle = {
  ...starMarkerStyle,
  backgroundColor: MACRO_COLOR,
  borderColor: MACRO_COLOR,
}


export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string, // # of followers
    handle: PropTypes.string,
    influence: PropTypes.string,
    hover: PropTypes.bool,
    user: PropTypes.string,
    followers: PropTypes.number,
    influencerScore: PropTypes.number,
    location: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  };

  static defaultProps = {
    handle: 'handle',
  };

  constructor(props) {
    super(props);
  }

  render() {

    let style;

    // changes marker color to reflect the influence level
    if (this.props.marker.influence === "micro") {
      style = microMarkerStyle;
    } else if (this.props.marker.influence === "mid") {
      style = midMarkerStyle;
    } else if (this.props.marker.influence === "macro") {
      style = macroMarkerStyle;
    } else if (this.props.marker.influence === "star") {
      style = starMarkerStyle;
    }

    // enlargens marker if you hover
    style = this.props.$hover ? markerStyleHover : style;
    // enalargens marker if you click as well
    if ((this.props.activeMarker.Handle === this.props.marker.Handle)) {
      style = markerStyleHover;
    }

    return (
      <a>
        <div style={style}>
          {this.props.text}
        </div>
      </a>
    );
  }
}
