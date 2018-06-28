import React from 'react';
import MuralButton from './MuralButton';

class MuralList extends React.Component {


  render() {
    return (
      <aside className="mural-list__wrapper">
        <div className="mural-list__header">
          Showing {this.props.visibleMurals.length} of {this.props.numberOfMurals} murals.
        </div>
        <ul className="mural-list">
          {this.props.visibleMurals.map((mural, index) => {
            return (
              <li key={index}>
                <MuralButton
                  muralData={mural}
                  onButtonClick={this.props.onButtonClick}
                />
              </li>
            )
          })}
        </ul>
        <div className="mural-list__footer">
          By <a href="https://tetchi.ca">tetchi</a>. Data from City of Montreal. View on Github.
        </div>
      </aside>
    );
  }
}

export default MuralList;