import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Map, Marker} from 'google-maps-react';

export default class MapContainer extends Component {
  componentDidUpdate() {
    this.loadMaps();
  }

  loadMaps() {
    const { google } = this.props; // sets props equal to google
    const maps = google.maps; // sets maps to google maps props

    // const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
    // const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

    // const mapConfig = Object.assign({}, {
    //   center: { lat: 40.7485722, lng: -74.0068633 }, // sets center of google map to NYC.
    //   zoom: 11, // sets zoom. Lower numbers are zoomed further out.
    //   mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
    // })

    // this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
  }

  render() {
    return (
      <Map className="map" google={this.props.google}>
        
      </Map>
    );
  }
}
