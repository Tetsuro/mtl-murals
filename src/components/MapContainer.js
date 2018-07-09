import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react';

export default class MapContainer extends Component {
  shouldComponentUpdate() {
    if (this.props.mapIsLoaded) {
      return false;
    }

    return true;
  }

  onMouseOver(props, marker) {
    marker.setAnimation(this.google.maps.Animation.BOUNCE);
  }

  onMouseOut(props, marker) {
    marker.setAnimation(null);
  }

  render() {
    if (!this.props.muralsArray) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div>
        <Map
          google={this.props.google}
          bounds={this.props.bounds}
          onBounds_changed={this.props.updateVisible}
        >
          {
            this.props.muralsArray.map(mural => (
              <Marker
                key={mural.properties.id}
                title={mural.properties.artiste}
                position={
                  {
                    lat: mural.properties.latitude,
                    lng: mural.properties.longitude,
                  }
                }
                onClick={() => { this.props.onMarkerClick(mural.properties); }}
                onMouseover={this.onMouseOver}
                onMouseout={this.onMouseOut}
              />
            ))
          }
        </Map>
      </div>
    );
  }
}
