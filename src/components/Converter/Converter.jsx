import React, { useEffect, useState } from 'react';
import KeyBoardOther from '../KeyBoardOther/KeyBoardOther';
import PropTypes from 'prop-types';

import ScreenOther from '../ScreenOther/ScreenOther';
import { ReactComponent as Loader } from '../../img/Loader.svg';

import './Converter.scss';
import Select from '../Select/Select';

const Converter = (props) => {
  const [from, setFrom] = useState(
    {
      name: 'RUB',
      value: '₽',
    });
  const [to, setTo] = useState(
    {
      name: 'USD',
      value: '$',
    });

  const setFromValue = (value) => setFrom(value);
  const setToValue = (value) => setTo(value);

  const onClick = () => {
    props.setLoading(true);
    setCurrentCourse(to.name)
  }

  const setCurrentCourse = async (e) => {
    if (e.target) {
      const cc = await props.handleConvertaionCurrency(e.target.value);
      await props.setCurrentCourse(cc)
      return;
    }

    const cc = await props.handleConvertaionCurrency(e);
    await props.setCurrentCourse(cc)
  }

  const onChange = (e) => {
    props.switchService(e.target.value);
    props.updateCurrencyList();
  }

  return (
    <div className='converter__container'>
      <ScreenOther
        CURRENCY_TABLE={props.CURRENCY_TABLE}
        currencyList={props.currencyList}
        setFromValue={setFromValue}
        setToValue={setToValue}
        to={to}
        from={from}
        currentNumber={props.currentNumber}
        handleBasicCurrency={props.handleBasicCurrency}
        setCurrentCourse={setCurrentCourse}
        resultNumber={props.resultNumber}
        fontSizeOne={props.fontSizeOne}
        fontSizeTwo={props.fontSizeTwo}
      />
      <span onClick={onClick} className='converter__update'>
        Update rates
        {props.isLoading && <Loader className='loader' />}
      </span>
      <span className='converter__switch'>
        <p>Switch Service:</p>
        <Select
          onChange={onChange}
          options={
            [
              { name: 'CC', value: 'CC' }, { name: 'FCA', value: 'FCA' }, { name: 'OE', value: 'OE' }
            ]
          } />
      </span>
      <KeyBoardOther buttons={props.buttons} handleCurNum={props.handleCurNum} />
    </div>
  )
}

Converter.propTypes = {
  currencyList: PropTypes.array,
  CURRENCY_TABLE: PropTypes.object,
  resultNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSizeOne: PropTypes.number,
  fontSizeTwo: PropTypes.number,
  handleBasicCurrency: PropTypes.func,
  isLoading: PropTypes.bool,
  buttons: PropTypes.array,
  handleCurNum: PropTypes.func,
  updateCurrencyList: PropTypes.func,
  switchService: PropTypes.func,
  setLoading: PropTypes.func,
  setCurrentCourse: PropTypes.func,
  handleConvertaionCurrency: PropTypes.func,
};

Converter.defaultProp = {
  currencyList: [],
  CURRENCY_TABLE: {},
  resultNumber: '0',
  currentNumber: '0',
  fontSizeOne: 88,
  fontSizeTwo: 88,
  isLoading: false,
  buttons: [],
  handleCurNum: () => console.log('Не определена функция handleCurNum'),
  handleBasicCurrency: () => console.log('Не определена функция handleBasicCurrency'),
  updateCurrencyList: () => console.log('Не определена функция updateCurrencyList'),
  switchService: () => console.log('Не определена функция switchService'),
  setLoading: () => console.log('Не определена функция setLoading'),
  setCurrentCourse: () => console.log('Не определена функция setCurrentCourse'),
  handleConvertaionCurrency: () => console.log('Не определена функция handleConvertaionCurrency'),
};

export default Converter;