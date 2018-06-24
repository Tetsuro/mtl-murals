import React from 'react';
import MuralButton from './MuralButton';

class MuralList extends React.Component {
  render() {
    console.log(this.props.visibleMurals)
    return (
      <aside className="mural-list__wrapper">
        <div className="mural-list__header">
          Showing X of X murals.
        </div>
        <ul className="mural-list">
          {this.props.visibleMurals.map((mural, index) => {
            return (
              <li key={index}>
                <MuralButton 
                  muralData={mural}
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