import React, { useCallback, useEffect, useState } from 'react';

import Select from '../Select/Select';
import ScreenLine from './ScreenLine';

import './ScreenOther.scss';

const ScreenOther = (props) => {
  const [from, setFrom] = useState('RUB');
  const [to, setTo] = useState('USD');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(props.currencyList);

  }, [props.currencyList]);


  const handleFrom = (e) => {
    setFrom(e.target.value);
  }


  const handleTo = (e) => {
    setTo(e.target.value);
  }

  return (
    <div className='screen'>
      <ScreenLine
        className='screen-line__one'
        currency={from}
        handleSelect={handleFrom}
        defaultValue={from}
        options={options}
      />
      <ScreenLine
        className='screen-line__two'
        currency={to}
        handleSelect={handleTo}
        defaultValue={to}
        options={options}
      />
    </div>
  )
}

export default ScreenOther;