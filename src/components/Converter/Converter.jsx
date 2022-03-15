import React from 'react';
import KeyBoardOther from '../KeyBoardOther/KeyBoardOther';

import ScreenOther from '../ScreenOther/ScreenOther';

import './Converter.scss';

const Converter = (props) => {
  return (
    <div className='converter__container'>
      <ScreenOther currencyList={props.currencyList} currency={'USD'} currentNumber={props.currentNumber} />
      <KeyBoardOther buttons={props.buttons} handleCurNum={props.handleCurNum} />
    </div>
  )
}

export default Converter;