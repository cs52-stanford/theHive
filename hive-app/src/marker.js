import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  M_WIDTH,
  M_HEIGHT,
} from './numbers'

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: M_WIDTH,
  height: M_HEIGHT,
  left: -M_WIDTH / 2,
  top: -M_HEIGHT / 2,

  border: '5px solid red',
  borderRadius: M_HEIGHT,
  backgroundColor: 'red',
  textAlign: 'center',
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
  &:hover {
  z-index: 1;
  }
};

const markerStyleHover = {
  ...markerStyle,
  border: '5px solid blue',
  color: 'blue'
};

export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string,
    $hover: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    const style = this.props.$hover ? markerStyleHover : markerStyle;
    return (
       <div style={style}>
          {this.props.text}
       </div>
    );
  }
}
