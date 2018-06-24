import React from 'react';

class MuralButton extends React.Component {
  render() {
    let { 
      adresse: address, 
      annee: year, 
      artiste: artist,
      image,
      latitude,
      longitude,
      id,
    } = this.props.muralData.properties;

    let muralThumbnailStyle = {
      backgroundImage: `url(${image})`,
    };

    return (
      <button 
        className="mural-button"
      >
        <span 
          className="mural-button__thumbnail" 
          style={muralThumbnailStyle}
        >
        </span> 
        <span className="mural-button__info">
          {address}
        </span>      
      </button>
    );
  }
}

export default MuralButton;