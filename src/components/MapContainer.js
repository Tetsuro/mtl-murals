import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Map, Marker} from 'google-maps-react';

export default class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      bounds: null,
      muralsArray: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.muralsArray !== null) {
      return;
    }

    this.setState({
      muralsArray: this.props.muralsArray,
    });
    this.loadMaps();
  }

  loadMaps() {
    console.log('Load Maps.')
    if (!this.state.muralsArray) {
      return;
    }

    // console.log("load maps!", this.state.muralsArray); // Is this firing twice without guard above?

    const google = this.props.google; // sets props equal to google
    const maps = this.props.google.maps; // sets maps to google maps props
    const muralsArray = this.state.muralsArray;
    
    let bounds = new google.maps.LatLngBounds();

    muralsArray.map((mural) => {
      let {
        latitude,
        longitude,
      } = mural.properties;
      bounds.extend({
        lat: latitude,
        lng: longitude,
      });
    });

    this.setState({
      bounds,
    });
  }

  render() {
    return (
      <Map 
        className="map" 
        google={this.props.google}
        bounds={this.state.bounds}
        muralsArray={this.props.muralsArray}
      >
      </Map>
    );
  }
}
