import React from 'react';

class MuralButton extends React.Component {

  onClicked() {
    console.log('hi!');
  }

  render() {
    let { 
      adresse: address, 
      image,
    } = this.props.muralData.properties;

    let muralThumbnailStyle = {
      backgroundImage: `url(${image})`,
    };

    return (
      <button
        className="mural-button"
        onClick={() => { this.props.onButtonClick(this.props.muralData.properties)}}
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