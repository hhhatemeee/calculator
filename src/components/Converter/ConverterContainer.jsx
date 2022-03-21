import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import splittingNumber from '../../helpers/splittingNumber';
import { setCurrentCourseCreator, setCurrentServiceCreator, setFetchingCreator, setLoadingCreator } from '../../redux/convertationReducer';
import Converter from './Converter'
import { BUTTONS_MOCK } from '../../variables';
import { KEYS_NAME } from '../../variables';
import ConvertationService from '../../services/convertationService';


const ConverterContainer = (props) => {
  const options = [];
  const [currentNumber, setCurrentNumber] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);
  const [fontSizeOne, setFontSizeOne] = useState(88);
  const [fontSizeTwo, setFontSizeTwo] = useState(88);
  const [servicesStatusApi, setServicesStatusApi] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
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
    setServicesStatusApi(ConvertationService.getStatusApi());
  }, [props.isFetching]);

  const onKeyDown = (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === KEYS_NAME.Backspace || e.key === '.') {
      handleCurNum(e.key);
    }

    if (e.ctrlKey && e.keyCode === 86) {
      navigator.clipboard.readText()
        .then(text => {
          if (!Number.isNaN(Number(text)))
            handleCurNum(text);
        })
    }
  };

  useEffect(() => generateList(), [props.currencyList]);

  useEffect(() => onKeyDown(props.currentKey), [props.currentKey]);

  useEffect(() => {
    let curNum = currentNumber.toString();

    if (props.currentCourse > 1) {
      setResultNumber((Number(curNum) / props.currentCourse).toFixed(2));
      return;
    }
    setResultNumber((Number(curNum) / props.currentCourse).toFixed(2));
  }, [props.currentCourse]);

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
        case BUTTONS_MOCK.reset:
          curNum = '0';
          break;
        case BUTTONS_MOCK.delete:
          curNum = curNum.toString().slice(0, curNum.length - 1)
          break;
        case KEYS_NAME.Backspace:
          curNum = curNum.toString().slice(0, curNum.length - 1)
          break;
        case '.':
          if (curNum.includes('.')) {
            return;
          }
          value = '.';
          curNum += value;
          break;
        case BUTTONS_MOCK.dot:
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
          console.log(value, curNum);
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
    props.currencyList.forEach((val) => {
      options.push({ name: val, value: val })
    })

    setCurrencyList(options);
  }

  return (
    <Converter
      onKeyDown={onKeyDown}
      CURRENCY_TABLE={CURRENCY_TABLE}
      currentNumber={currentNumber}
      currencyList={currencyList}
      buttons={props.buttons}
      handleCurNum={handleCurNum}
      isLoading={props.isLoading}
      setLoading={props.setLoading}
      setCurrentCourse={props.setCurrentCourse}
      resultNumber={resultNumber}
      fontSizeOne={fontSizeOne}
      fontSizeTwo={fontSizeTwo}
      services={props.services}
      listLimit={props.listLimit}
      currentService={props.currentService}
      setCurrentService={props.setCurrentService}
      servicesStatus={servicesStatusApi}
      servicesUrl={props.servicesUrl}
      setFetching={props.setFetching}
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
    servicesUrl: state.convertation.servicesUrl,
    currentService: state.convertation.currentService,
    isFetching: state.convertation.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (isLoading) => dispatch(setLoadingCreator(isLoading)),
    setCurrentCourse: (value) => dispatch(setCurrentCourseCreator(value)),
    setCurrentService: (service) => dispatch(setCurrentServiceCreator(service)),
    setFetching: (bool) => dispatch(setFetchingCreator(bool)),
  }
}

ConverterContainer.propTypes = {
  currencyList: PropTypes.array,
  buttons: PropTypes.array,
  isLoading: PropTypes.bool,
  currentCourse: PropTypes.number,
  setLoading: PropTypes.func,
  setCurrentCourse: PropTypes.func,
  services: PropTypes.array,
  listLimit: PropTypes.array,
  currentService: PropTypes.string,
  setCurrentService: PropTypes.func,
  currentKey: PropTypes.object
};

ConverterContainer.defaultProps = {
  currencyList: [],
  buttons: [],
  isLoading: false,
  currentCourse: 1,
  services: [],
  listLimit: [],
  currentService: 'CC',
  currentKey: {},
  setLoading: () => console.log('Не определена функция setLoading'),
  setCurrentCourse: () => console.log('Не определена функция setCurrentCourse'),
  setCurrentService: () => console.log('Не определена функция setCurrentService'),
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);
