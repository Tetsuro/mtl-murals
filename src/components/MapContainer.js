import React, { Component } from 'react';
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
    // if (prevState.muralsArray !== null) {
    //   return;
    // }
    // console.log('map updating');
    // this.setState({
    //   muralsArray: this.props.muralsArray,
    // });
    // this.loadMaps();
  }

  render() {
    if(!this.props.muralsArray) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          <Map 
            google={this.props.google}
            bounds={this.props.bounds}
          >
            {
              this.props.muralsArray.map((mural)=> {
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
                    onClick={() => {this.props.onMarkerClick(mural.properties.image)}}
                  />
                )
              })
            }
          </Map>
        </div>
      );
    }
  }
}
