import { useEffect, useState } from 'react';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService from './services/convertationService';

import './App.scss';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [renderWindow, setRenderWindow] = useState(false);
  const [servicesLimit, setServicesLimit] = useState([])

  const handleShowWindow = (isShow, listLimit) => {
    if (listLimit) {
      setRenderWindow(isShow);
      setTimeout(() => setShowWindow(isShow), 0);
      setServicesLimit(listLimit)

      return;
    }
    setShowWindow(isShow);
  };

  useEffect(() => {
    window.convertationService = new ConvertationService('CC', (isShow, listLimit) => handleShowWindow(isShow, listLimit));
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
      />
    </div>
  );
}

export default App;

