import React, { Component } from 'react';
import { Map, Marker} from 'google-maps-react';

export default class MapContainer extends Component {
  componentDidUpdate() {
    this.loadMaps();
  }

  loadMaps() {
    const { google } = this.props;
    console.log(google);
  }

  render() {
    return (
      <div className="map">

      </div>
    );
  }
}
