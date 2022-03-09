import React from 'react';
import './ScreenCalculations.scss';

const ScreenCalculations = (props) => {
  console.log(props.currentNumber);
  return (
    <div className="calc-screen__calculations-container" id="calculationContainer">
      <button className="calc-screen__btn-left" id="leftBtn">&lt;</button>
      <p className="calc-screen__calculations" id="calcText">0</p>
      <button className="calc-screen__btn-right" id="rightBtn">&gt;</button>
    </div>
  )
}

export default ScreenCalculations;