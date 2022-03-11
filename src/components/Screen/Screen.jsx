import React, { useEffect, useRef } from 'react'
import ScreenCalculations from './ScreenCalculations/ScreenCalculations';
import "./Screen.scss";


const Screen = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.fontSize = `${props.fontSize}px`;

    }
  }, [props.fontSize])

  return (
    <div className='calc-screen'>
      <ScreenCalculations isShown={props.isShown} history={props.history} />
      <p ref={ref} className="calc-screen__result" id="resultText">{
        props.result && !props.currentNumber ? props.result : props.currentNumber
      }</p>
    </div>
  )
}

export default Screen