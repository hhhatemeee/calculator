import React from 'react';

import CalculatorContainer from './components/Calculator/CalculatorContainer';
import ModalWindow from './components/ModalWindow/ModalWindow';

const CalcDelegation = (props) => {
  return (
    <div>
      <CalculatorContainer />
      {
        props.renderWindow
          ? <ModalWindow
            showWindow={props.showWindow}
            listLimit={props.listLimit}
            onClick={props.onCLick}
            switchService={props.switchService}
            url={props.url}
          />
          : null
      }
    </div>
  )
}

export default CalcDelegation