import React from 'react';
import PropTypes from 'prop-types';

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

Screen.propTypes = {
  isShow: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  currentNumber: PropTypes.string,
  result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.number,
}

Screen.defaultProps = {
  isShow: false,
  history: '0',
  currentNumber: '0',
  result: 0,
  fontSize: 96,
}

export default Screen