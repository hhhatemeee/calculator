import './App.scss';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import { connect } from 'react-redux';
import ScreenContainer from './components/Screen/ScreenContainer';
import CalcDelegation from './CalcDelegation';

function App(props) {
  return (
    <div className='calc'>
      <ThemeSelector />
      <CalcDelegation />
    </div>
  );
}

export default App;
