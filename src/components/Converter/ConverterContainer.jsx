import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import splittingNumber from '../../helpers/splittingNumber';
import { setCurrentCourseCreator, setCurrentServiceCreator, setLoadingCreator } from '../../redux/convertationReducer';
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

  const onKeypress = e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === '.') {
      handleCurNum(e.key);
    }

    if (e.ctrlKey && e.keyCode == 86) {
      navigator.clipboard.readText()
        .then(text => {
          if (!Number.isNaN(Number(text)))
            handleCurNum(text);
        })
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeypress);

    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [currentNumber]);

  useEffect(() => {
    let curNum = currentNumber.toString();

    if (props.currentCourse > 1) {
      setResultNumber((Number(curNum) / props.currentCourse).toFixed(2));
      return;
    }
    setResultNumber((Number(curNum) * props.currentCourse).toFixed(2));
  })

  /**
   * Calculates the font size for the display
   * @param {number} num - Length of the current number
   * @param {boolean} isSecondLine - If true, then calculate the length for the second row
   * @returns 
   */
  const getFontSize = (num, isSecondLine) => {
    let size;
    size = 88;

    if (isSecondLine) {
      if (num > 6) {
        size = -(num * 7.5) + 126.74;

      }

      if (num >= 10) {
        size = -(num * 4) + 89.2;
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

  /**
   * Handler for the current button click
   * @param {string/number} button -  the current value of the button
   * @returns 
   */
  const handleCurNum = (button) => {
    if (button.toString().length < 17) {



      let curNum = currentNumber.toString();
      let value = button;
      switch (value) {
        case 'reset':
          curNum = '0';
          break;
        case 'delete':
          curNum = curNum.toString().slice(0, curNum.length - 1)
          break;
        case 'Backspace':
          curNum = curNum.toString().slice(0, curNum.length - 1)
          break;
        case '.':
          if (curNum.includes('.')) {
            return;
          }
          value = '.';
          curNum += value;
          break;
        case 'dot':
          if (curNum.includes('.')) {
            return;
          }
          value = '.';
          curNum += value;
          break;
        default:
          if (curNum.length === 15) {
            return
          }
          value = button;
          curNum += value;
          break;
      }

      //If the last value of the number is a point, then save
      if (curNum.split('').at(-1) === '.') {
        setCurrentNumber(curNum);
        return;
      }

      // You cannot enter more than two numbers after the dot
      if (curNum.includes('.') && curNum.split('.')[1].length > 2) {
        return;
      }

      getFontSize(splittingNumber(curNum).length);

      setCurrentNumber(Number(curNum));

      // If the rate is greater than 1 then divide the numbers
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
  }

  // Generate a list of currencies
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
      services={props.services}
      listLimit={props.listLimit}
      currentService={props.currentService}
      setCurrentService={props.setCurrentService}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    currencyList: state.convertation.currencyList,
    buttons: state.buttonList,
    isLoading: state.convertation.isLoading,
    currentCourse: state.convertation.currentCourse,
    services: state.convertation.services,
    currentService: state.convertation.currentService,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (isLoading) => dispatch(setLoadingCreator(isLoading)),
    setCurrentCourse: (value) => dispatch(setCurrentCourseCreator(value)),
    setCurrentService: (service) => dispatch(setCurrentServiceCreator(service)),
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
  services: PropTypes.array,
  listLimit: PropTypes.array,
  currentService: PropTypes.string,
  setCurrentService: PropTypes.func,

};

ConverterContainer.defaultProp = {
  currencyList: [],
  buttons: [],
  isLoading: false,
  currentCourse: 1,
  services: [],
  listLimit: [],
  currentService: 'CC',
  setLoading: () => console.log('Не определена функция setLoading'),
  setCurrentCourse: () => console.log('Не определена функция setCurrentCourse'),
  switchService: () => console.log('Не определена функция switchService'),
  handleUpdateCurrencyList: () => console.log('Не определена функция handleUpdateCurrencyList'),
  handleBasicCurrency: () => console.log('Не определена функция handleBasicCurrency'),
  handleConvertaionCurrency: () => console.log('Не определена функция handleConvertaionCurrency'),
  setCurrentService: () => console.log('Не определена функция setCurrentService'),
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);
