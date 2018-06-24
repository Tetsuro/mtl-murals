import React, { Component } from 'react';
import { Map, Marker} from 'google-maps-react';

export default class MapContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mapIsLoaded) {
      return false;
    } else {
      return true;
    }
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
            onDragend={this.props.updateVisible}
            onZoom_changed={this.props.updateVisible}
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
                    onClick={() => {this.props.onMarkerClick(mural.properties)}}
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
