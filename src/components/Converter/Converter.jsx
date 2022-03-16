import React, { useEffect, useState } from 'react';
import KeyBoardOther from '../KeyBoardOther/KeyBoardOther';

import ScreenOther from '../ScreenOther/ScreenOther';
import { ReactComponent as Loader } from '../../img/Loader.svg';

import './Converter.scss';
import Select from '../Select/Select';

const Converter = (props) => {
  const onClick = () => {
    props.setLoading(true);
    props.updateCurrencyList();
  }

  const onChange = (e) => {
    props.switchService(e.target.value);
  }

  return (
    <div className='converter__container'>
      <ScreenOther
        CURRENCY_TABLE={props.CURRENCY_TABLE}
        currencyList={props.currencyList}
        currency={'USD'}
        currentNumber={props.currentNumber}
        handleBasicCurrency={props.handleBasicCurrency}
        handleConvertaionCurrency={props.handleConvertaionCurrency}
        setCurrentCourse={props.setCurrentCourse}
        resultNumber={props.resultNumber}
      />
      <span onClick={onClick} className='converter__update'>
        Update rates
        {props.isLoading && <Loader className='loader' />}
      </span>
      <span className='converter__switch'>
        <p>Switch Service:</p>
        <Select
          onChange={onChange}
          options={
            [
              { name: 'CC', value: 'CC' }, { name: 'FCA', value: 'FCA' }, { name: 'OE', value: 'OE' }
            ]
          } />
      </span>
      <KeyBoardOther buttons={props.buttons} handleCurNum={props.handleCurNum} />
    </div>
  )
}

export default Converter;