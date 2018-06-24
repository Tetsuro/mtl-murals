import './App.css';
import React, { Component } from 'react';
import Topbar from './components/Topbar';
import MapContainer from './components/MapContainer';
import MuralList from './components/MuralList';
import Modal from './components/Modal';
import { GoogleApiWrapper } from 'google-maps-react';

const muralUrl = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';
const googleMapsApiKey = 'AIzaSyD-TATyCOANU-cDVmSUFfawsD-ykZyQcO0';

class App extends Component {
  constructor() {
    super();
    this.fetchMutalData = this.fetchMutalData.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      modalIsOpen: false,
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

  onMarkerClick(image) {
    console.log(this, image);
    this.setState({
      modalIsOpen: true,
      image,
    });
  }

  onModalClose() {
    console.log('on modal close!')
    this.setState(
      {
        modalIsOpen: false,
      }
    )
  }

  foo(arg) {
    console.log(this, arg);
  }

  render() {
    const modal = this.state.modalIsOpen ? (
      <Modal>
        <button onClick={this.onModalClose}>Close</button>
        <img src={this.state.image} />
      </Modal>) : null;

    return (
      <div className="mtl-murals">
        <Topbar />
        <div className="wrapper">
          <div className="map">
            <MapContainer
              google={this.props.google}
              muralsArray={this.state.muralsArray}
              onMarkerClick={this.onMarkerClick}
            />
          </div>
          <MuralList
            muralsArray={this.state.muralsArray}
          />
        </div>
        <div id="modal">
          {modal}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapsApiKey,
})(App);