import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  M_WIDTH,
  M_HEIGHT,
} from './data/numbers';
import TableEntry from './TableEntry.js';
import { Timeline } from 'react-twitter-widgets';
import './fonts.css';

export default class Sidebar extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {

    // const imglink = "https://twitter.com/" + this.props.marker['Handle'] + "/profile_image?size=normal"
    return (

      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: (this.state.activeMarker.Handle).toString(),
        }}
        options={{
          username: 'TwitterDev',
          height: '400'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
      />

      (this.props.finalData).map((marker, index) => (
            <TableEntry
              key={index}
              index={index}
              activeMarker = {this.state.activeMarker}
              marker={marker}
              >
            </TableEntry>
        ))
    );
  }
}
