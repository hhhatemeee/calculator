import React from 'react';
import PropTypes from 'prop-types';

import CalculatorContainer from './components/Calculator/CalculatorContainer';
import ModalWindow from './components/ModalWindow/ModalWindow';

const CalcDelegation = (props) => {
  return (
    <div>
      <CalculatorContainer />
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
  url: PropTypes.string,
};

CalcDelegation.defaultProps = {
  renderWindow: false,
  showWindow: false,
  listLimit: [],
  onClick: () => console.warn('Не указана функция onClick'),
  switchService: () => console.warn('Не указана функция switchService'),
  url: '',
}

export default CalcDelegation