import React from 'react'

import Screen from './Screen';

const ScreenContainer = (props) => {

  return (
    <Screen isShown={props.isShown} fontSize={props.fontSize} history={props.history} currentNumber={props.currentNumber} result={props.result} />
  )
}



export default ScreenContainer;