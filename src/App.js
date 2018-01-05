import './App.css';
import React, { Component } from 'react';
import Topbar from './components/Topbar';
import MuralList from './components/MuralList';
import MuralMap from './components/MuralMap';

const muralUrl = 'http://donnees.ville.montreal.qc.ca/dataset/53d2e586-6e7f-4eae-89a1-2cfa7fc29fa0/resource/d325352b-1c06-4c3a-bf5e-1e4c98e0636b/download/murales.json';

class App extends Component {
  constructor() {
    super();
    this.fetchMuralData = this.fetchMuralData.bind(this);
    this.state = {
      muralsArray: null,
    }
  }

  componentDidMount() {
    this.fetchMuralData();
  }

  fetchMuralData() {
    fetch(muralUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ muralsArray: data.features });
      });
  }

  render() {
    if (this.state.muralsArray) {
      return (
        <div className="mtl-murals">
          <Topbar />
          <div className="wrapper">
            <MuralMap
              muralsArray={this.state.muralsArray}
            />
            <MuralList 
              muralsArray={this.state.muralsArray}
            />
          </div>
        </div>
      );
    } else {
      return(
        <div className="mtl-murals">
          <Topbar />
          <div className="wrapper">
            <p>Loading...</p>
          </div>
        </div>
      );
    }
  }
}

export default App;
