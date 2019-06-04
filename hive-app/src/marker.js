import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
// import {markerList} from './data/markerData'

const markerStyle = {
  position: 'absolute',
  width: M_WIDTH,
  height: M_HEIGHT,
  left: -M_WIDTH / 2,
  top: -M_HEIGHT / 2,

  border: '5px solid #ecbf42',
  borderRadius: M_HEIGHT,
  backgroundColor: '#ecbf42',
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  color: 'white',
  fontSize: 14,
  fontWeight: 'bold',
  padding: 4,
};

const markerStyleHover = {
  ...markerStyle,
  border: '5px solid white',
  borderRadius: 50,
  width: M_WIDTH*2,
  height: M_HEIGHT*2,
  left: -M_WIDTH*2/ 2,
  top: -M_HEIGHT*2 / 2,
  zIndex: 1,
};

export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string,
    handle: PropTypes.string,
    influence: PropTypes.number,
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

    var style = this.props.$hover ? markerStyleHover : markerStyle;
    if ((this.props.activeMarker.index === this.props.index)) {
      style = markerStyleHover;
    }
    return (
      <a
      // <a href={"http://twitter.com/"+this.props.handle}
      >
        <div style={style}>
          {this.props.text}
        </div>
      </a>
    );
  }
}
