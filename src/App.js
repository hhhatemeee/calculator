import { useEffect, useState } from 'react';

import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import CalcDelegation from './CalcDelegation';
import ConvertationService from './services/convertationService';

import './App.scss';


// console.log(convertationService);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // console.log(fetch('https://currencyapi.com/api/v2/latest?apikey=c9a07820-85c3-11ec-a180-d59bc7ad8635&base_currency=USD')
  //   .then(res => res.json()).then(res => console.log(res.data)));
  const handleTheme = (isToggle) => {
    setDarkMode(isToggle);
  }

  useEffect(() => {
    const convertationService = new ConvertationService('CC');

  }, [])

  return (
    <div className={`calc${darkMode ? ' calc_theme_dark' : ''}`}>
      <ThemeSelector darkMode={darkMode} onChange={handleTheme} />
      <CalcDelegation />
    </div>
  );
}

export default App;
