import React, { useCallback, useEffect, useState } from 'react';
import splittingNumber from '../../helpers/splittingNumber';

import ScreenLine from './ScreenLine';

import './ScreenOther.scss';

const ScreenOther = (props) => {
  const [from, setFrom] = useState(
    {
      name: 'RUB',
      value: '₽',
    });
  const [to, setTo] = useState(
    {
      name: 'USD',
      value: '$',
    });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(props.currencyList);

  }, [props.currencyList]);

  const handleFrom = (e) => {
    props.handleBasicCurrency(e.target.value);

    if (Object.keys(props.CURRENCY_TABLE).includes(e.target.value)) {
      setFrom({
        name: e.target.value,
        value: props.CURRENCY_TABLE[e.target.value],
      });
      return;
    }

    setFrom({
      name: e.target.value,
      value: e.target.value,
    });
  };

  const handleTo = async (e) => {
    const cc = await props.handleConvertaionCurrency(e.target.value);
    await props.setCurrentCourse(cc);

    if (Object.keys(props.CURRENCY_TABLE).includes(e.target.value)) {
      setTo({
        name: e.target.value,
        value: props.CURRENCY_TABLE[e.target.value],
      });
      return;
    }

    setTo({
      name: e.target.value,
      value: e.target.value,
    });
  };


  return (
    <div className='screen'>
      <ScreenLine
        className='screen-line__one'
        currency={from.value}
        handleSelect={handleFrom}
        defaultValue={from.name}
        currentNumber={splittingNumber(props.currentNumber)}
        options={options}
      />
      <ScreenLine
        className='screen-line__two'
        currency={to.value}
        handleSelect={handleTo}
        defaultValue={to.name}
        currentNumber={splittingNumber(props.resultNumber)}
        options={options}
      />
    </div>
  )
}

export default ScreenOther;