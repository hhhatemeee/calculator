import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select/Select';

import './ScreenLine.scss';

// Draws the translation line
const ScreenLine = (props) => {
  return (
    <div className='screen-line'>
      <span>
        <p style={{ fontSize: `${props.fontSize}px` }} className='screen-line__current'>{props.currentNumber || 0}</p>
        <p className='screen-line__currency'>{props.currency}</p>
      </span>
      <Select
        onChange={props.handleSelect}
        defaultValue={props.defaultValue}
        options={props.options}
      />
    </div>
  )
}

ScreenLine.propTypes = {
  fontSize: PropTypes.number,
  currentNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  handleSelect: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
}

ScreenLine.defaultProps = {
  fontSize: 88,
  currentNumber: 0,
  currency: '',
  handleSelect: () => console.log('Не определена функция handleSelect'),
  defaultValue: '',
  options: [],
}

export default ScreenLine;