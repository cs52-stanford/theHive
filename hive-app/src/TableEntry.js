import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers'
// import {markerList} from './data/markerData'

const ENTRY_INFO_LENGTH = M_WIDTH * 4;

const entryStyle = {
  // position: 'absolute',
  // width: ENTRY_INFO_LENGTH * 3,
  // height: ENTRY_INFO_LENGTH,

  // border: '5px solid #ecbf42',
  backgroundColor: 'whitesmoke',
  display: 'flex',
  // justifyContent:'center',
  // alignItems:'center',
  padding: 20,
};

const imageStyle = {
  // position: 'absolute',
  width: ENTRY_INFO_LENGTH,
  height: ENTRY_INFO_LENGTH,
  borderRadius: ENTRY_INFO_LENGTH,

  // border: '5px solid #ecbf42',
  backgroundColor: 'LightGray',
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',

  marginRight: 20,
};


export default class TableEntry extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <a>
        <div style={entryStyle}>
          <div style={imageStyle}>
          </div>
          Name handle

          bio
          location
        </div>
      </a>
    );
  }
}
