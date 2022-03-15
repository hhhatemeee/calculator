import React, { useState } from 'react';
import cn from 'classnames';

import './Select.scss';

const Select = (props) => {
  return (
    <div className='select'>
      <div className='select__container-line'>
        <select id="selectTest" value={props.defaultValue} onChange={props.onChange}>
          {
            props.options.map((line) => <option key={line.value} value={line.value}>{line.name}</option>)
          }
        </select>
      </div>
    </div>
  )
}

export default Select;