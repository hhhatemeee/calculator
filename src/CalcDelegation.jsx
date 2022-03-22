import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CalculatorContainer from './components/Calculator/CalculatorContainer';
import ModalWindow from './components/ModalWindow/ModalWindow';
import HomePage from './components/HomePage/HomePage';
import ConverterContainer from './components/Converter/ConverterContainer';
import { CALC_TYPES } from './variables';


const CalcDelegation = (props) => {
  let calculator;

  useEffect(() => { }, [props.listLimit])

  switch (props.currentType) {
    case CALC_TYPES.Standart:
      calculator = <CalculatorContainer currentKey={props.currentKey} />;
      break;
    case CALC_TYPES.Currency:
      calculator = <ConverterContainer
        currentKey={props.currentKey}
        switchService={props.switchService}
        handleUpdateCurrencyList={props.handleUpdateCurrencyList}
        handleBasicCurrency={props.handleBasicCurrency}
        handleConvertaionCurrency={props.handleConvertaionCurrency}
        listLimit={props.listLimit}
      />
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
  url: PropTypes.string,
  currentKey: PropTypes.object,
  onClick: PropTypes.func,
  switchService: PropTypes.func,
  setCurrentType: PropTypes.func,
  switchService: PropTypes.func,
  handleUpdateCurrencyList: PropTypes.func,
  handleBasicCurrency: PropTypes.func,
  handleConvertaionCurrency: PropTypes.func,
};

CalcDelegation.defaultProps = {
  renderWindow: false,
  showWindow: false,
  listLimit: [],
  url: '',
  currentKey: {},
  onClick: () => console.warn('Не указана функция onClick'),
  switchService: () => console.warn('Не указана функция switchService'),
  setCurrentType: () => console.warn('Не указана функция setCurrentType'),
  switchService: () => console.log('Не определена функция switchService'),
  handleUpdateCurrencyList: () => console.log('Не определена функция handleUpdateCurrencyList'),
  handleBasicCurrency: () => console.log('Не определена функция handleBasicCurrency'),
  handleConvertaionCurrency: () => console.log('Не определена функция handleConvertaionCurrency'),
}

export default CalcDelegation