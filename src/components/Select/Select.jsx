import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Select.scss';
import { optionsInterface } from './SelectInterface';

//Draws a list selector
const Select = ({ defaultValue, onChange, options }) => {
  useEffect(() => { }, [options]);

  return (
    <div className='select'>
      <div className='select__container-line'>
        <select id="selectTest" value={defaultValue} onChange={onChange}>
          {
            options.map((line) => <option key={line.value} value={line.value}>{line.name}</option>)
          }
        </select>
      </div>
    </div>
  )
}

Select.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(optionsInterface)).isRequired,
};

Select.defaultProp = {
  defaultValue: '',
}


export default Select;