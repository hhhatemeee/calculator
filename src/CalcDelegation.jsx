import React from 'react';
import PropTypes from 'prop-types';

import CalculatorContainer from './components/Calculator/CalculatorContainer';
import ModalWindow from './components/ModalWindow/ModalWindow';
import HomePage from './components/HomePage/HomePage';
import ConverterContainer from './components/Converter/ConverterContainer';

const CalcDelegation = (props) => {
  let calculator;

  switch (props.currentType) {
    case 'Standart':
      calculator = <CalculatorContainer />;
      break;
    case 'Currency':
      calculator = <ConverterContainer />;
      break;
    default:
      calculator = <HomePage setCurrentType={props.setCurrentType} />
      break;
  }

  return (
    <div>
      {calculator}
      {
        props.renderWindow && <ModalWindow
          showWindow={props.showWindow}
          listLimit={props.listLimit}
          onClick={props.onClick}
          switchService={props.switchService}
          url={props.url}
        />

      }
    </div>
  )
}

CalcDelegation.propTypes = {
  renderWindow: PropTypes.bool,
  showWindow: PropTypes.bool,
  listLimit: PropTypes.array,
  onClick: PropTypes.func,
  switchService: PropTypes.func,
  setCurrentType: PropTypes.func,
  url: PropTypes.string,
};

CalcDelegation.defaultProps = {
  renderWindow: false,
  showWindow: false,
  listLimit: [],
  onClick: () => console.warn('Не указана функция onClick'),
  switchService: () => console.warn('Не указана функция switchService'),
  setCurrentType: () => console.warn('Не указана функция setCurrentType'),
  url: '',
}

export default CalcDelegation