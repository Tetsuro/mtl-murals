import './App.css';
import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Topbar from './components/Topbar';
import MapContainer from './components/MapContainer';
import MuralList from './components/MuralList';
import Modal from './components/Modal';

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
    };
  }

  componentDidMount() {
    this.fetchMutalData();
    document.addEventListener('keydown', this.keyDown.bind(this));
  }

  onMarkerClick(muralData) {
    this.setState({
      modalIsOpen: true,
      image: muralData.image,
    });
  }

  onModalClose() {
    this.setState({
      modalIsOpen: false,
    });
  }

  getMapBounds() {
    const { google } = this.props;
    const { muralsArray } = this.state;
    const bounds = new google.maps.LatLngBounds();

    muralsArray.map((mural) => {
      const {
        latitude,
        longitude,
      } = mural.properties;

      bounds.extend({
        lat: latitude,
        lng: longitude,
      });

      return null;
    });

    this.setState({
      bounds,
      mapIsLoaded: true,
      visibleMurals: muralsArray,
    });
  }

  keyDown(evt) {
    const { modalIsOpen } = this.state;

    if (evt.keyCode === 27 && modalIsOpen) {
      this.onModalClose();
    }
  }

  fetchMutalData() {
    fetch(muralUrl)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          muralsArray: data.features,
        });
        this.getMapBounds();
      });
  }

  updateVisible(mapProps, map) {
    const newBounds = map.getBounds();
    const { muralsArray } = this.state;

    const visibleMarkers = muralsArray.filter((mural) => {
      const { latitude, longitude } = mural.properties;
      if (newBounds.contains({ lat: latitude, lng: longitude })) {
        return mural;
      }
      return null;
    });

    this.setState({
      visibleMurals: visibleMarkers,
    });
  }

  render() {
    const {
      modalIsOpen,
      image,
      muralsArray,
      bounds,
      mapIsLoaded,
      visibleMurals,
    } = this.state;

    const { google } = this.props;

    const modal = modalIsOpen ? (
      <Modal>
        <button type="button" className="modal__button" onClick={this.onModalClose}>
          Close
        </button>
        <img className="modal__image" src={image} alt="" />
      </Modal>) : null;

    return (
      <div className="mtl-murals">
        <Topbar />
        <div className="wrapper">
          <div className="map" id="map">
            <MapContainer
              google={google}
              muralsArray={muralsArray}
              onMarkerClick={this.onMarkerClick}
              bounds={bounds}
              mapIsLoaded={mapIsLoaded}
              updateVisible={this.updateVisible}
            />
          </div>
          <MuralList
            visibleMurals={visibleMurals}
            numberOfMurals={muralsArray.length}
            onButtonClick={this.onMarkerClick}
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
