import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService from './services/convertationService';
import { setCurrencyListCreator } from './redux/convertationReducer';

import './App.scss';
import ChangesTypesContainer from './components/ChangeTypes/ChangesTypesContainer';
import { setCurrentTypeCreator } from './redux/calculationTypesReducer';

function App(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [renderWindow, setRenderWindow] = useState(false);
  const [servicesLimit, setServicesLimit] = useState([]);
  const [infoUrl, setInfoUrl] = useState('');

  const handleShowWindow = (isShow, listLimit, url) => {
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
      'CC',
      handleShowWindow,
      props.setCurrencyList,
    );
  }, []);

  const handleSwitchService = (service) => window.convertationService.switchService(service);

  const setCurrentType = (name) => props.setCurrentType(name);

  const handleTheme = (isToggle) => setDarkMode(isToggle);

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
    setCurrencyList: (list) => {
      dispatch(setCurrencyListCreator(list))
    },
    setCurrentType: (name) => {
      dispatch(setCurrentTypeCreator(name))
    },
  }
};

const mapStateToProps = (state) => {
  return {
    calcTypes: state.calculatorsType.types,
    currentType: state.calculatorsType.currentType,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

