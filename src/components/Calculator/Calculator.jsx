import React from 'react';
import PropTypes from 'prop-types';

import KeyBoard from '../KeyBoard/KeyBoard';
import Screen from '../Screen/Screen';

const Calculator = ({
  isShown,
  fontSize,
  history,
  currentNumber,
  result,
  onClick,
  buttons,
}) => {

  return (
    <div className='calc__container'>
      <Screen isShown={isShown} fontSize={fontSize} history={history} currentNumber={currentNumber} result={result} />
      <KeyBoard onClick={onClick} buttons={buttons} />
    </div>
  )
}

Calculator.propTypes = {
  buttons: PropTypes.array,
  currentNumber: PropTypes.string,
  result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  history: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.number,
  isShown: PropTypes.bool,
  onClick: PropTypes.func,
};

Calculator.defaultProp = {
  buttons: [],
  currentNumber: '0',
  result: 0,
  history: 0,
  fontSize: 96,
  isShown: false,
  onClick: () => console.log('Ну указана функция onClick'),
};

export default Calculator;