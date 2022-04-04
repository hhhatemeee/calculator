import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService, { initService } from './services/convertationService';
import { setCurrencyListCreator, setCurrentServiceCreator } from './redux/convertationReducer';
import ChangesTypesContainer from './components/ChangeTypes/ChangesTypesContainer';
import { setCurrentTypeCreator, setDisabledTypeCreator } from './redux/calculationTypesReducer';
import { CALC_TYPES } from './variables';

import './App.scss';

function App(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [renderWindow, setRenderWindow] = useState(false);
  const [servicesLimit, setServicesLimit] = useState([]);
  const [infoUrl, setInfoUrl] = useState('');
  const [convertationService, setConvertationService] = useState({});
  /**
   * Modal window display handler.
   * @param {boolean} isShow - Show Window
   * @param {array} listLimit - array of disabled services
   * @param {string} url - url of the current service
   * @returns 
   */

  const handleShowWindow = (isShow, listLimit, url) => {
    props.setCurrentService(convertationService.currentService);
    // If the length of lastlimit = 3, then turn off Currency and switch to the standard
    if (listLimit && listLimit.length === 3) {
      props.setDisabledType({ name: CALC_TYPES.Currency, value: true });
      setCurrentType(CALC_TYPES.Standart);
    }

    if (listLimit) {
      setRenderWindow({ isRendering: isShow, currentType: 'limit' });
      setTimeout(() => setShowWindow(isShow), 0);
      setServicesLimit(listLimit);
      setInfoUrl(url);
      return;
    }

    setInfoUrl(url);
    setShowWindow(isShow);
  };

  useEffect(() => {
    ConvertationService.getCallbacks(handleShowWindow, props.setCurrencyList);
    props.setCurrentService('CC');

  }, []);

  /**
   * Handler for switching the calculator type in the store
   * @param {string} name 
   * @returns 
   */
  const setCurrentType = (name) => props.setCurrentCalcType(name);

  /**
   * Theme Switching Handler
   * @param {boolean} isToggle 
   * @returns 
   */
  const handleTheme = (isToggle) => setDarkMode(isToggle);

  const onSetRenderWindow = (value) => setRenderWindow(value);

  return (
    <div className={cn('calc', { calc_theme_dark: darkMode })}>
      <ThemeSelector darkMode={darkMode} onChange={handleTheme} />
      <ChangesTypesContainer onSetRenderWindow={onSetRenderWindow} />
      <CalcDelegation
        showWindow={showWindow}
        renderWindow={renderWindow}
        listLimit={servicesLimit}
        onClick={handleShowWindow}
        url={infoUrl}
        types={props.calcTypes}
        currentType={props.currentType}
        setCurrentType={setCurrentType}
        currentImgName={props.currentImgName}
      />
    </div >
  );
}

App.propTypes = {
  setCurrencyList: PropTypes.func,
  setCurrentType: PropTypes.func,
  calcTypes: PropTypes.array,
  currentType: PropTypes.string,
};

App.defaultProps = {
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
    stateCalc: state.calculatorsType,
    currentImgName: state.calculatorsType.currentImgName,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


