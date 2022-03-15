import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService from './services/convertationService';
import { setCurrencyListCreator, setCurrentServiceCreator } from './redux/convertationReducer';
import ChangesTypesContainer from './components/ChangeTypes/ChangesTypesContainer';
import { setCurrentTypeCreator, setDisabledTypeCreator } from './redux/calculationTypesReducer';

import './App.scss';
import { CALC_TYPES } from './variables';

import './App.scss';

import './App.scss';


function App(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [renderWindow, setRenderWindow] = useState(false);
  const [servicesLimit, setServicesLimit] = useState([]);
  const [infoUrl, setInfoUrl] = useState('');

  /**
   * Modal window display handler.
   * @param {boolean} isShow - Show Window
   * @param {array} listLimit - array of disabled services
   * @param {string} url - url of the current service
   * @returns 
   */
  const handleShowWindow = (isShow, listLimit, url) => {
    props.setCurrentService(getCurrentService());
    // If the length of lastlimit = 3, then turn off Currency and switch to the standard
    if (listLimit && listLimit.length === 3) {
      props.setDisabledType({ name: CALC_TYPES.Currency, value: true });
      setCurrentType(CALC_TYPES.Standart);
    }

    if (listLimit) {
      setRenderWindow(isShow);
      setTimeout(() => setShowWindow(isShow), 0);
      setServicesLimit(listLimit);
      setInfoUrl(url);
      return;
    }

    setInfoUrl(url);
    setShowWindow(isShow);
  };

  useEffect(() => {
    window.convertationService = new ConvertationService(
      'FCA',
      handleShowWindow,
      props.setCurrencyList,
    );

    props.setCurrentService(getCurrentService());
  }, []);

  const handleSwitchService = (service) => window.convertationService.switchService(service);

  /**
   * Handler for switching the calculator type in the store
   * @param {string} name 
   * @returns 
   */
  const setCurrentType = (name) => props.setCurrentCalcType(name);

  const handleUpdateCurrencyList = () => window.convertationService.updateCurrencyList();

  const handleBasicCurrency = (value) => window.convertationService.setBasicCurrency(value);

  const handleConvertaionCurrency = async (value) => await window.convertationService.getConvertation(value);

  const getCurrentService = () => window.convertationService.getCurrentService();

  /**
   * Theme Switching Handler
   * @param {boolean} isToggle 
   * @returns 
   */
  const handleTheme = (isToggle) => setDarkMode(isToggle);

  console.log('составить схему приложения');

  return (
    <div className={cn('calc', { calc_theme_dark: darkMode })}>
      <ThemeSelector darkMode={darkMode} onChange={handleTheme} />
      <ChangesTypesContainer />
      <CalcDelegation
        showWindow={showWindow}
        renderWindow={renderWindow}
        listLimit={servicesLimit}
        onClick={handleShowWindow}
        switchService={handleSwitchService}
        url={infoUrl}
        types={props.calcTypes}
        currentType={props.currentType}
        setCurrentType={setCurrentType}
        handleUpdateCurrencyList={handleUpdateCurrencyList}
        handleBasicCurrency={handleBasicCurrency}
        handleConvertaionCurrency={handleConvertaionCurrency}
      />
    </div >
  );
}

App.propTypes = {
  setCurrencyList: PropTypes.func,
  setCurrentType: PropTypes.func,
  calcTypes: PropTypes.object,
  currentType: PropTypes.string,
};

App.defaultProp = {
  setCurrencyList: () => console.log('Не указана функция setCurrencyList'),
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  calcTypes: {},
  currentType: '',
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrencyList: (list) => dispatch(setCurrencyListCreator(list)),
    setCurrentCalcType: (name) => dispatch(setCurrentTypeCreator(name)),
    setCurrentService: (service) => dispatch(setCurrentServiceCreator(service)),
    setDisabledType: (value) => dispatch(setDisabledTypeCreator(value))
  }
};

const mapStateToProps = (state) => {
  return {
    calcTypes: state.calculatorsType.types,
    currentType: state.calculatorsType.currentType,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

