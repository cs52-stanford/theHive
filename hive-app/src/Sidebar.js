// Component for the Sidebar
// Includes a Twitter widget displaying the active marker's feed,
// and a list of the identified influencers
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a>
        {/* active marker's Twitter feed */}
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

        {/* creates a list of influencers, assigning each one to a TableEntry */}
        (this.props.finalData).map((marker, index) => (
              <TableEntry
                key={index}
                index={index}
                activeMarker={this.state.activeMarker}
                marker={marker}
                >
              </TableEntry>
          ))
      </a>
    );
  }
}
