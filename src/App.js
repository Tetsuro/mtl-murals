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
    this.updateVisible = this.updateVisible.bind(this);

    this.state = {
      modalIsOpen: false,
      muralsArray: [],
      visibleMurals: [],
    }
  }

  componentDidMount() {
    this.fetchMutalData();
  }

  fetchMutalData() {
    fetch(muralUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          muralsArray: data.features,
        });
        this.getMapBounds();
      });
  }

  getMapBounds() {
    const google = this.props.google;
    const muralsArray = this.state.muralsArray;
    let bounds = new google.maps.LatLngBounds();

    muralsArray.map((mural) => {
      let {
        latitude,
        longitude,
      } = mural.properties;

      bounds.extend({
        lat: latitude,
        lng: longitude,
      });
    });

    this.setState({
      bounds,
      mapIsLoaded: true,
      visibleMurals: this.state.muralsArray,
    })
  }

  onMarkerClick(muralData) {
    console.log(this, muralData.latitude, muralData.longitude);
    this.setState({
      modalIsOpen: true,
      image: muralData.image,
    });
  }
  
  onModalClose() {
    this.setState(
      {
        modalIsOpen: false,
      }
    )
  }

  updateVisible(mapProps, map) {
    const newBounds = map.getBounds();

    const visibleMarkers = this.state.muralsArray.filter(mural => {
      const { latitude, longitude } = mural.properties;
      if (newBounds.contains({lat: latitude, lng: longitude})) {
        return mural;
      }
    });

    this.setState({
      visibleMurals: visibleMarkers,
    });
  }

  render() {
    const modal = this.state.modalIsOpen ? (
      <Modal>
        <button onClick={this.onModalClose}>Close</button>
        <img className="modal__image" src={this.state.image} />
      </Modal>) : null;

    return (
      <div className="mtl-murals">
        <Topbar />
        <div className="wrapper">
          <div className="map" id="map">
            <MapContainer
              google={this.props.google}
              muralsArray={this.state.muralsArray}
              onMarkerClick={this.onMarkerClick}
              bounds={this.state.bounds}
              mapIsLoaded={this.state.mapIsLoaded}
              updateVisible={this.updateVisible}
            />
          </div>
          <MuralList
            visibleMurals={this.state.visibleMurals}
            numberOfMurals={this.state.muralsArray.length}
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