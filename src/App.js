import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService from './services/convertationService';
import { setCurrencyListCreator, setCurrentServiceCreator } from './redux/convertationReducer';

import './App.scss';
import ChangesTypesContainer from './components/ChangeTypes/ChangesTypesContainer';
import { setCurrentTypeCreator, setDisabledTypeCreator } from './redux/calculationTypesReducer';

function App(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [renderWindow, setRenderWindow] = useState(false);
  const [servicesLimit, setServicesLimit] = useState([]);
  const [infoUrl, setInfoUrl] = useState('');

  const handleShowWindow = (isShow, listLimit, url) => {
    props.setCurrentService(getCurrentService());
    if (listLimit && listLimit.length === 3) {
      props.setDisabledType({ name: 'Currency', value: true });
      setCurrentType('Standart');
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

  const setCurrentType = (name) => props.setCurrentCalcType(name);

  const handleUpdateCurrencyList = () => window.convertationService.updateCurrencyList();

  const handleBasicCurrency = (value) => window.convertationService.setBasicCurrency(value);

  const handleConvertaionCurrency = async (value) => await window.convertationService.getConvertation(value);

  const getCurrentService = () => window.convertationService.getCurrentService();

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

