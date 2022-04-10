import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ScreenOther from '../ScreenOther/ScreenOther';
import { ReactComponent as Loader } from '../../img/Loader.svg';
import ConverterSwitch from './ConverterSwitch/ConverterSwitch';
import { CURRENCY_MOCK } from '../../variables';
import KeyBoardBasic from '../KeyBoardBasic/KeyBoardBasic';
import convertationService from '../../services/convertationService';
import ModalInfoContainer from './ModalInfo/ModalInfoConainer';

import './Converter.scss';


const Converter = (props) => {
  const [from, setFrom] = useState(
    {
      name: CURRENCY_MOCK.RUB[0],
      value: CURRENCY_MOCK.RUB[1],
    });
  const [to, setTo] = useState(
    {
      name: CURRENCY_MOCK.USD[0],
      value: CURRENCY_MOCK.USD[1],
    });
  const [statusServices, setStatusServices] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const setOptions = () => props.services.filter((el) => !props.listLimit.includes(el.name));

  useEffect(() => { }, [props.currentService]);

  useEffect(() => {
    document.addEventListener('mousedown', handleShowInfo);

    return () => document.removeEventListener('mousedown', handleShowInfo);
  }, []);

  const onClick = () => {
    props.setLoading(true);
    setCurrentCourse(to.name);
  }

  const setFromValue = (value) => setFrom(value);
  const setToValue = (value) => setTo(value);

  const onSetIsShow = (value) => setIsShow(value);

  const onSetStatusServices = (value) => {
    setStatusServices(value);
  };

  const setCurrentCourse = async (e) => {
    const currentService = convertationService.getCurrentService();

    //If an event came from the selector, then process it.
    if (e.target && e.target.value) {
      const cc = await convertationService.getConvertation(e.target.value);
      await props.setCurrentCourse(cc)
      return;
    }

    //If the name of the currency has come
    const cc = await convertationService.getConvertation(e);
    if (cc === 'Unavailable') {
      props.setLoading(false);

      Object.values(statusServices).forEach((val, i) => {
        const name = Object.keys(val)[0];
        if (name === currentService) {
          const editStatusService = { [name]: 'Unavailable' };
          statusServices.splice(i, 1);
          setStatusServices([...statusServices, editStatusService])
        }
      })
    }
    await props.setCurrentCourse(cc);
  }

  const onChange = (e) => {
    const targetValue = e && e.target && e.target.value
      ? e.target.value
      : 'CC';

    props.setCurrentService(targetValue)
    convertationService.switchService(targetValue);
    convertationService.updateCurrencyList();
  }

  const onSwapCurrency = () => {
    const currentCurrencies = { from: { ...from }, to: { ...to } };

    setFrom(currentCurrencies.to);
    setTo(currentCurrencies.from);
    convertationService.setBasicCurrency(to.name);
    props.setCurrentCourse(1 / props.currentCourse);
  }

  const handleShowInfo = (e) => {
    let result;

    if (e.target.classList.contains('ico-Info')) {
      return;
    }

    e.target.classList.forEach((name) => {
      if (name.includes('modal-info')) {
        result = true;
        return;
      }
    });

    result ? setIsShow(true) : setIsShow(false);
  }

  return (
    <div className='converter__container'>
      <ModalInfoContainer
        servicesUrl={props.servicesUrl}
        setFetching={props.setFetching}
        isFetching={props.isFetching}
        statusServices={statusServices}
        onSetStatusServices={onSetStatusServices}
        onSetIsShow={onSetIsShow}
        isShow={isShow}
      />
      <ScreenOther
        CURRENCY_TABLE={props.CURRENCY_TABLE}
        currencyList={props.currencyList}
        setFromValue={setFromValue}
        setToValue={setToValue}
        to={to}
        from={from}
        currentNumber={props.currentNumber}
        setCurrentCourse={setCurrentCourse}
        resultNumber={props.resultNumber}
        fontSizeOne={props.fontSizeOne}
        fontSizeTwo={props.fontSizeTwo}
      />
      <i className='ico-Swap converter__swap-button' onClick={onSwapCurrency} data-testid='swapBtn' />
      <span onClick={onClick} className='converter__update'>
        Update rates
        {props.isLoading && <Loader className='loader' />}
      </span>
      <ConverterSwitch
        listLimit={props.listLimit}
        currentService={props.currentService}
        onChange={onChange}
        options={setOptions()}
      />
      <KeyBoardBasic buttons={props.buttons} handleCurNum={props.handleCurNum} />
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
  isLoading: PropTypes.bool,
  buttons: PropTypes.array,
  handleCurNum: PropTypes.func.isRequired,
  setLoading: PropTypes.func,
  setCurrentCourse: PropTypes.func,
  services: PropTypes.array,
  listLimit: PropTypes.array,
  currentService: PropTypes.string,
  setCurrentService: PropTypes.func,
  servicesStatus: PropTypes.object,
  isFetching: PropTypes.bool,
};

Converter.defaultProps = {
  currencyList: [],
  CURRENCY_TABLE: {},
  resultNumber: '0',
  currentNumber: '0',
  fontSizeOne: 88,
  fontSizeTwo: 88,
  isLoading: false,
  buttons: [],
  services: [],
  listLimit: [],
  currentService: 'CC',
  servicesStatus: {},
  isFetching: false,
  handleCurNum: () => console.log('Не определена функция handleCurNum'),
  handleBasicCurrency: () => console.log('Не определена функция handleBasicCurrency'),
  updateCurrencyList: () => console.log('Не определена функция updateCurrencyList'),
  switchService: () => console.log('Не определена функция switchService'),
  setLoading: () => console.log('Не определена функция setLoading'),
  setCurrentCourse: () => console.log('Не определена функция setCurrentCourse'),
  handleConvertaionCurrency: () => console.log('Не определена функция handleConvertaionCurrency'),
  setCurrentService: () => console.log('Не определена функция setCurrentService'),
};

export default Converter;