import React from 'react';
import Select from '../Select/Select';

import './ScreenLine.scss';

const ScreenLine = (props) => {
  return (
    <div className='screen-line'>
      <span>
        <p className='screen-line__current'>{props.currentNumber || 0}</p>
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

export default ScreenLine;