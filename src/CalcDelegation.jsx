import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CalculatorContainer from './components/Calculator/CalculatorContainer';
import ModalWindow from './components/ModalWindow/ModalWindow';
import HomePage from './components/HomePage/HomePage';
import ConverterContainer from './components/Converter/ConverterContainer';
import { CALC_TYPES } from './variables';


const CalcDelegation = (props) => {
  const [currentKey, setCurrentKey] = useState({});

  let calculator;
  useEffect(() => { }, [props.listLimit])

  switch (props.currentType) {
    case CALC_TYPES.Standart:
      calculator = <CalculatorContainer currentKey={currentKey} />;
      break;
    case CALC_TYPES.Currency:
      calculator = <ConverterContainer
        currentKey={currentKey}
        listLimit={props.listLimit}
        getStatusApi={props.getStatusApi}
      />
      break;
    default:
      calculator = <HomePage setCurrentType={props.setCurrentType} />
      break;
  }

  const onKeyDown = (e) => setCurrentKey(e);

  return (
    <div className='calc-delegation__conatiner' tabIndex='-1' onKeyDown={onKeyDown}>
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
  setCurrentType: PropTypes.func,
};

CalcDelegation.defaultProps = {
  renderWindow: false,
  showWindow: false,
  listLimit: [],
  url: '',
  currentKey: {},
  onClick: () => console.warn('Не указана функция onClick'),
  setCurrentType: () => console.warn('Не указана функция setCurrentType'),
}

export default CalcDelegation