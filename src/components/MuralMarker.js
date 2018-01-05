import React from 'react';

class MuralMarker extends React.Component {
  render() {
    return ( 
      <div className="mural-marker">
        {this.props.id}
      </div>
    )
  }
}

export default MuralMarker;