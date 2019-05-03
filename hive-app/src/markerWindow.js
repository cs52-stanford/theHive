import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
import {markerList} from './data/markerData'


const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
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
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

const markerStyleHover = {
  ...markerStyle,
  border: '5px solid white',
  color: 'white'
};

export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string,
    handle: PropTypes.string,
  };

  static defaultProps = {
    handle: 'refugees',
  };

  render() {
    const style = this.props.$hover ? markerStyleHover : markerStyle;
    return (
      <a href={"http://twitter.com/"+this.props.handle}>
       <div style={style}>
          {this.props.text}
       </div>
     </a>
    );
  }
}
