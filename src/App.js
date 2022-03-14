import { useEffect, useState } from 'react';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService from './services/convertationService';

import './App.scss';
import { connect } from 'react-redux';
import { setCurrencyListCreator } from './redux/convertationReducer';

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
      (isShow, listLimit, url) => handleShowWindow(isShow, listLimit, url),
      props.setCurrencyList,
    );
  }, [])

  const handleSwitchService = (service) => {
    window.convertationService.switchService(service);
  }

  const handleTheme = (isToggle) => {
    setDarkMode(isToggle);
  }

  return (
    <div className={`calc${darkMode ? ' calc_theme_dark' : ''}`}>
      <ThemeSelector darkMode={darkMode} onChange={handleTheme} />
      <CalcDelegation
        showWindow={showWindow}
        renderWindow={renderWindow}
        listLimit={servicesLimit}
        onCLick={handleShowWindow}
        switchService={handleSwitchService}
        url={infoUrl}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    convertation: state.convertation,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrencyList: (list) => {
      dispatch(setCurrencyListCreator(list))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

