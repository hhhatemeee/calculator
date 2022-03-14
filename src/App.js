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
      />
    </div >
  );
}

App.propTypes = {
  setCurrencyList: PropTypes.func,
};

App.defaultProp = {
  setCurrencyList: () => console.log('Не указана функция setCurrencyList'),
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrencyList: (list) => {
      dispatch(setCurrencyListCreator(list))
    },
  }
};

export default connect(mapDispatchToProps)(App);

