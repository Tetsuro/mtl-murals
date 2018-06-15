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
    if (!this.state.muralsArray) {
      return;
    }

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
  
  onMarkerClick() {
    console.log(this)
  }

  render() {
    if(!this.state.muralsArray) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <Map 
          google={this.props.google}
          bounds={this.state.bounds}
          muralsArray={this.props.muralsArray}
        >
          {
            this.state.muralsArray.map((mural)=> {
              return (
                <Marker
                  key = {mural.properties.id}
                  title = {mural.properties.artiste}
                  position={
                    { 
                      lat: mural.properties.latitude, 
                      lng: mural.properties.longitude,
                    }
                  }
                  onClick={this.onMarkerClick}
                />

              )
            })
          } 
        </Map>
      );
    }

  }
}
