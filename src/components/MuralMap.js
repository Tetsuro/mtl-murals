import React from 'react';
import GoogleMapReact from 'google-map-react';
import MuralMarker from './MuralMarker';
import { fitBounds } from 'google-map-react/utils';

class MuralMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 45.5017,
      lng: -73.5673,
    },
    zoom: 12,
  };

  render() {
    let bounds = [];
    
    return (
      <div className="map" id="map">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            this.props.muralsArray.map((mural, index) => {
              let { 
                latitude, 
                longitude, 
                id,
                image,
                adresse: address,
                artiste: artist,
                annee: year,
              } = mural.properties;

              return (
                <MuralMarker
                  key={index}
                  lat={latitude}
                  lng={longitude}
                  id={id}
                />
              )
            })
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default MuralMap;