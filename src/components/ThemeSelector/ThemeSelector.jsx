import React from 'react';
import PropTypes from 'prop-types';

import "./ThemeSelector.scss";

const ThemeSelector = ({ darkMode, onChange }) => {
  const handlerOnChange = () => onChange(!darkMode);

  return (
    <div className="theme">
      <div className="theme__container">
        <input className='checkbox' type="checkbox" id="checkbox" onChange={handlerOnChange} />
        <label htmlFor="checkbox" className="theme__selector" id="toggleSelector">
          <i className="icon-sun"></i>
          <i className="icon-moon-1"></i>
          <div className="theme__ball" id="toggleBall"></div>
        </label>
      </div>
    </div>
  )
}

ThemeSelector.propTypes = {
  darkMode: PropTypes.bool,
  onChange: PropTypes.func,
};

ThemeSelector.defaultProp = {
  darkMode: false,
  onChange: () => console.log('Не указана функция onChange'),
};

export default ThemeSelector