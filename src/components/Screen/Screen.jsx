import React from 'react'

import ScreenCalculations from './ScreenCalculations/ScreenCalculations';

import "./Screen.scss";


const Screen = (props) => {
  return (
    <div className='calc-screen'>
      <ScreenCalculations isShown={props.isShown} history={props.history} />
      <p style={{ fontSize: `${props.fontSize}px` }} className="calc-screen__result" id="resultText">
        {
          (props.result && props.currentNumber === '0') ? props.result : props.currentNumber
        }
      </p>
    </div>
  )
}

export default Screen