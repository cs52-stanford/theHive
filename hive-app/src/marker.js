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
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
};

const markerStyleHover = {
  ...markerStyle,
  border: '5px solid white',
  color: 'white'
};

const popupHoverStyle = {
  color: 'black',
  backgroundColor: 'white',
  padding: 15,
  marginTop: -100,
  // left: 0,
  // top: 0,
};

export default class Marker extends Component {
  static propTypes = {
    text: PropTypes.string,
    handle: PropTypes.string,
    influence: PropTypes.number,
  };

  static defaultProps = {
    handle: 'refugees',
  };


  render() {
    // const changeBorderColor = 'white';
    // if (this.props.influence === 1) {
    //   changeBorderColor = 'red';
    // } else if (this.props.influence === 2) {
    //   changeBorderColor = 'blue';
    // } else if (this.props.influence === 3) {
    //   changeBorderColor = 'green';
    // } else if (this.props.influence === 4) {
    //   changeBorderColor = 'pink';
    // }

    const style = this.props.$hover ? markerStyleHover : markerStyle;
    return (
      <div style={{
        display: 'flex',
        backgroundColor: 'green',
        width: M_WIDTH * 8,
      }}>
        <a href={"http://twitter.com/"+this.props.handle} style={{
        }}>
          <div style={style}>
            {this.props.text}
          </div>
        </a>
        <a href={"http://twitter.com/"+this.props.handle} style={{
        }}>
          <div style={style}>
            {this.props.text}
          </div>
        </a>

        <div style={popupHoverStyle} className="hint__content">
          <div>
            @{this.props.handle}
          </div>
          <div>
            Refugee tweets: 50%
          </div>
          <div>
            Sample tweets
          </div>
        </div>

      </div>
    );
  }
}
