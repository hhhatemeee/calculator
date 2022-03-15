import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './ScreenCalculations.scss';

const ScreenCalculations = ({
  isShown,
  history,
}) => {

  const historyRef = useRef(null);

  return (
    <div className="calc-screen__calculations-container" id="calculationContainer">
      {
        isShown && <button
          className="calc-screen__btn-left"
          id="leftBtn"
          onClick={() => historyRef.current.scrollLeft -= 100}
        >&lt;</button>
      }
      <p ref={historyRef} className="calc-screen__calculations" id="calcText">{history}</p>
      {
        isShown && <button
          className="calc-screen__btn-right"
          id="rightBtn"
          onClick={() => historyRef.current.scrollLeft += 100}
        >&gt;</button>
      }
    </div>
  )
}

ScreenCalculations.propTypes = {
  isShown: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ScreenCalculations.defaultProp = {
  isShown: false,
  history: 0,
};


export default ScreenCalculations;