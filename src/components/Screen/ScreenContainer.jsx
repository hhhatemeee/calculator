import React from 'react'
import { connect } from 'react-redux';
import Screen from './Screen';

const ScreenContainer = (props) => {
  return (
    <Screen currentNumber={props.currentNumber} result={props.result} />
  )
}

const mapStateToProps = (state) => {
  return {
    currentNumber: state.calculations.currentNumber,
    result: state.calculations.result,
  }
};

export default connect(mapStateToProps)(ScreenContainer);