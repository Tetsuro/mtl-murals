import React from 'react';

const MuralButton = (props) => {
  const {
    adresse: address,
    image,
  } = props.muralData.properties;

  const muralThumbnailStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <button
      type="button"
      className="mural-button"
      onClick={() => { props.onButtonClick(props.muralData.properties); }}
    >
      <span
        className="mural-button__thumbnail"
        style={muralThumbnailStyle}
      />
      <span className="mural-button__info">
        {address}
      </span>
    </button>
  );
};

export default MuralButton;
