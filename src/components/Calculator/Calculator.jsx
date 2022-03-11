import React from 'react';

import KeyBoard from '../KeyBoard/KeyBoard';
import ScreenContainer from '../Screen/ScreenContainer'

const Calculator = (props) => {
  return (
    <div className='calc__container'>
      <ScreenContainer isShown={props.isShown} fontSize={props.fontSize} history={props.history} currentNumber={props.currentNumber} result={props.result} />
      <KeyBoard onClick={props.onClick} buttonList={props.buttonList} />
    </div>
  )
}

export default Calculator;