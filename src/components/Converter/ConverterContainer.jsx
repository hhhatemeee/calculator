import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import splittingNumber from '../../helpers/splittingNumber';
import { setCurrentCourseCreator, setLoadingCreator } from '../../redux/convertationReducer';

import Converter from './Converter'

const ConverterContainer = (props) => {
  const options = [];
  const [currentNumber, setCurrentNumber] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);
  const [fontSizeOne, setFontSizeOne] = useState(88);
  const [fontSizeTwo, setFontSizeTwo] = useState(88);
  const CURRENCY_TABLE = {
    RUB: '₽',
    EUR: '€',
    ALL: 'L',
    FKP: '£',
    GIP: '£',
    IRR: '﷼',
    JMD: '$',
    AUD: '$',
    LAK: '₭',
  };

  useEffect(() => {
    let curNum = currentNumber.toString();

    if (props.currentCourse > 1) {
      setResultNumber((Number(curNum) / props.currentCourse).toFixed(2));
      return;
    }
    setResultNumber((Number(curNum) * props.currentCourse).toFixed(2));
  })

  const getFontSize = (num, isSecondLine) => {
    let size;
    size = 88;

    if (isSecondLine) {
      if (num > 6) {
        size = -(num * 7.5) + 126.74;

      }

      if (num >= 10) {
        size = -(num * 4) + 89.2;
        console.log(size);
      }

      if (num > 13) {
        size = -(num * 2.8) + 75.4;
      }
      setFontSizeTwo(size);

      return;
    }

    if (num > 6) {
      size = -(num * 8.2) + 136.6;
    }

    if (num > 10) {
      size = -(num * 3.08) + 81.88;
    }

    if (num > 15) {
      size = -(num * 1.48) + 57.85;
    }

    setFontSizeOne(size)
  }

  const handleCurNum = (button) => {
    let curNum = currentNumber.toString();
    let value = button;

    switch (value) {
      case 'reset':
        curNum = '0';
        break;
      case 'delete':
        curNum = curNum.toString().slice(0, curNum.length - 1)
        break;
      case 'dot':
        value = '.';
        curNum += value;
        console.log(curNum);
        break;
      default:
        if (curNum.length === 15) {
          return
        }
        value = button;
        curNum += value;
        break;
    }


    if (curNum.split('').at(-1) === '.') {
      setCurrentNumber(curNum);
      return;
    }

    if (curNum.includes('.') && curNum.split('.')[1].length > 2) {
      return;
    }

    getFontSize(splittingNumber(curNum).length);

    setCurrentNumber(Number(curNum));

    if (props.currentCourse > 1) {
      const result = (Number(curNum) / props.currentCourse).toFixed(2);
      getFontSize(result.toString().length, true);

      setResultNumber(result);
      return;
    }

    const result = (Number(curNum) * props.currentCourse).toFixed(2);
    getFontSize(result.toString().length, true);
    setResultNumber(result);
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
      resultNumber={resultNumber}
      fontSizeOne={fontSizeOne}
      fontSizeTwo={fontSizeTwo}
    />
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

ConverterContainer.propTypes = {
  currencyList: PropTypes.array,
  buttons: PropTypes.array,
  isLoading: PropTypes.bool,
  currentCourse: PropTypes.number,
  setLoading: PropTypes.func,
  setCurrentCourse: PropTypes.func,
  switchService: PropTypes.func,
  handleUpdateCurrencyList: PropTypes.func,
  handleBasicCurrency: PropTypes.func,
  handleConvertaionCurrency: PropTypes.func,
};

ConverterContainer.defaultProp = {
  currencyList: [],
  buttons: [],
  isLoading: false,
  currentCourse: 1,
  setLoading: () => console.log('Не определена функция setLoading'),
  setCurrentCourse: () => console.log('Не определена функция setCurrentCourse'),
  switchService: () => console.log('Не определена функция switchService'),
  handleUpdateCurrencyList: () => console.log('Не определена функция handleUpdateCurrencyList'),
  handleBasicCurrency: () => console.log('Не определена функция handleBasicCurrency'),
  handleConvertaionCurrency: () => console.log('Не определена функция handleConvertaionCurrency'),
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);