import React, { useEffect, useRef } from 'react';
import './ScreenCalculations.scss';

const ScreenCalculations = (props) => {
  const ref = useRef([])

  console.log(props.isShown);

  const addToRef = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
    console.log(ref);
  }

  useEffect(() => {
    if (props.isShown) {
      ref.current.forEach((el) => {
        el.style.visibility = 'visible';
      })
      return;
    }
    ref.current.forEach((el) => {
      el.style.visibility = 'hidden';
    })
  })

  return (
    <div className="calc-screen__calculations-container" id="calculationContainer">
      <button ref={addToRef} className="calc-screen__btn-left" id="leftBtn">&lt;</button>
      <p className="calc-screen__calculations" id="calcText">{props.history}</p>
      <button ref={addToRef} className="calc-screen__btn-right" id="rightBtn">&gt;</button>
    </div>
  )
}

export default ScreenCalculations;