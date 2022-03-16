import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { setCurrentCourseCreator, setLoadingCreator } from '../../redux/convertationReducer';
import Converter from './Converter'

const ConverterContainer = (props) => {
  const options = [];
  const [currentNumber, setCurrentNumber] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);

  const CURRENCY_TABLE = {
    RUB: '₽',
    EUR: '€',
    KYD: '$',
    COP: '$',
    ALL: 'L',
    XCD: '$',
    BBD: '$',
    BND: '$',
    CUP: '$',
    USD: '$',
    FKP: '£',
    GIP: '£',
    IRR: '﷼',
    JMD: '$',
    AUD: '$',
    LAK: '₭',
  };

  const handleCurNum = (value) => {
    let curNum = currentNumber.toString();

    curNum += value;
    setCurrentNumber(Number(curNum))
    setResultNumber((Number(curNum) / props.currentCourse).toFixed(2));
  }

  const generateList = () => {
    props.currencyList.map((val) => {
      options.push({ name: val, value: val })
    })

    return options;
  }

  const updateCurrencyList = () => props.handleUpdateCurrencyList();


  const result = useMemo(() => generateList())


  return (
    <Converter
      CURRENCY_TABLE={CURRENCY_TABLE}
      currentNumber={currentNumber}
      currencyList={result}
      buttons={props.buttons}
      handleCurNum={handleCurNum}
      updateCurrencyList={updateCurrencyList}
      isLoading={props.isLoading}
      setLoading={props.setLoading}
      switchService={props.switchService}
      handleBasicCurrency={props.handleBasicCurrency}
      handleConvertaionCurrency={props.handleConvertaionCurrency}
      setCurrentCourse={props.setCurrentCourse}
      resultNumber={resultNumber} />
  )
}

const mapStateToProps = (state) => {
  return {
    currencyList: state.convertation.currencyList,
    buttons: state.buttonList,
    isLoading: state.convertation.isLoading,
    currentCourse: state.convertation.currentCourse,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (isLoading) => dispatch(setLoadingCreator(isLoading)),
    setCurrentCourse: (value) => dispatch(setCurrentCourseCreator(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);