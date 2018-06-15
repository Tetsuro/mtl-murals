import './App.css';
import React, { Component } from 'react';
import Topbar from './components/Topbar';
import MapContainer from './components/MapContainer';
import MuralList from './components/MuralList';
import { GoogleApiWrapper } from 'google-maps-react';

const muralUrl = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
const googleMapsApiKey = 'AIzaSyD-TATyCOANU-cDVmSUFfawsD-ykZyQcO0';

class App extends Component {
  constructor() {
    super();
    this.fetchMutalData = this.fetchMutalData.bind(this);
    this.state = {
      muralsArray: []
    }
  }

  componentDidMount() {
    this.fetchMutalData();
  }

  fetchMutalData() {
    fetch(muralUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ muralsArray: data.features })
      });
  }

  render() {
    return (
      <div className="mtl-murals">
        <Topbar />
        <div className="wrapper">
          <MapContainer
            google={this.props.google}
            muralsArray={this.state.muralsArray}
          />
          <MuralList
            muralsArray={this.state.muralsArray}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey,
})(App);