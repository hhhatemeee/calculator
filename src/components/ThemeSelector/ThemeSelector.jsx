import React from 'react';

import "./ThemeSelector.scss";

const ThemeSelector = (props) => {
  return (
    <div className="theme">
      <div className="theme__container">
        <input className='checkbox' type="checkbox" id="checkbox" onChange={() => props.onChange(!props.darkMode)} />
        <label htmlFor="checkbox" className="theme__selector" id="toggleSelector">
          <i className="icon-sun"></i>
          <i className="icon-moon-1"></i>
          <div className="theme__ball" id="toggleBall"></div>
        </label>
      </div>
    </div>
  )
}

export default ThemeSelector