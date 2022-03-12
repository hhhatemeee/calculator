import React, { lazy, Suspense } from 'react'
import CalculatorContainer from './components/Calculator/CalculatorContainer'
// const ModalWindow = lazy(() => import('./components/ModalWindow/ModalWindow'))
import ModalWindow from './components/ModalWindow/ModalWindow'

const CalcDelegation = (props) => {
  return (
    <div>
      <CalculatorContainer />
      {/* <Suspense fallback={<div>Loading..</div>}>
        {props.showWindow ? <ModalWindow showWindow={props.showWindow} /> : null}
      </Suspense> */}
      {
        props.renderWindow
          ? <ModalWindow
            showWindow={props.showWindow}
            listLimit={props.listLimit}
            onClick={props.onCLick}
            switchService={props.switchService}
          />
          : null
      }
    </div>
  )
}

export default CalcDelegation