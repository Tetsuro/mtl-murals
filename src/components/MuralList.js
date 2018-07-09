import React from 'react';
import MuralButton from './MuralButton';

const MuralList = props => (
  <aside className="mural-list__wrapper">
    <div className="mural-list__header">
      Showing {props.visibleMurals.length} of {props.numberOfMurals} murals.
    </div>
    <ul className="mural-list">
      {props.visibleMurals.map(mural => (
        <li key={mural.properties.id}>
          <MuralButton
            muralData={mural}
            onButtonClick={props.onButtonClick}
          />
        </li>
      ))}
    </ul>
    <div className="mural-list__footer">
      By <a href="https://tetchi.ca">tetchi</a>. Data from City of Montreal. View on Github.
    </div>
  </aside>
);

export default MuralList;
