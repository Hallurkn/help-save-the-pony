import React from 'react';

const Navigation: React.FC<NavigationProps> = ({ move, moveMessage }) => {

  return (
    <React.Fragment>
      <h4>Controls / How to play the game</h4>
      <p>Move your pony using using the arrows on your keyboard, or the buttons below.</p>
      <ul className="list-unstyled list-inlined">
        <li><b>E</b> = Your end destination</li>
        <li><b>P</b> = Your pony</li>
        <li><b>D</b> = The Domokun</li>
      </ul>
      <ul className="list-unstyled list-inline">
        <li>
          <button className="btn" onClick={() => move('north')}>Up</button>
        </li>
        <li>
          <button className="btn" onClick={() => move('west')}>Left</button>
        </li>
        <li>
          <button className="btn" onClick={() => move('east')}>Right</button>
        </li>
        <li>
          <button className="btn" onClick={() => move('south')}>Down</button>
        </li>
      </ul>


      {moveMessage ? <h6>{moveMessage}</h6> : ''}
    </React.Fragment>
  );
}

interface NavigationProps {
  move: (direction: 'south' | 'north' | 'east' | 'west') => void;
  moveMessage: string;
}

export default Navigation;