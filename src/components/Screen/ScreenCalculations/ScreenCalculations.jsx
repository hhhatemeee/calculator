import React, { useEffect, useRef } from 'react';

import './ScreenCalculations.scss';

const ScreenCalculations = (props) => {
  const ref = useRef([])
  const historyRef = useRef(null);

  const addToRef = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
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
  }, [props.isShown]);

  return (
    <div className="calc-screen__calculations-container" id="calculationContainer">
      <button
        ref={addToRef}
        className="calc-screen__btn-left"
        id="leftBtn"
        onClick={() => historyRef.current.scrollLeft -= 100}
      >&lt;</button>
      <p ref={historyRef} className="calc-screen__calculations" id="calcText">{props.history}</p>
      <button
        ref={addToRef}
        className="calc-screen__btn-right"
        id="rightBtn"
        onClick={() => historyRef.current.scrollLeft += 100}
      >&gt;</button>
    </div>
  )
}

export default ScreenCalculations;