import './App.scss';
import KeyBoard from './components/KeyBoard/KeyBoard';
import Screen from './components/Screen/Screen';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import { connect } from 'react-redux';
import KeyBoardContainer from './components/KeyBoard/KeyBoardContainer';
import ScreenContainer from './components/Screen/ScreenContainer';

function App(props) {

  console.log(props.themeSelector);
  return (
    <div className='calc'>
      <ThemeSelector />
      <div className='calc__container'>
        <ScreenContainer />
        <KeyBoardContainer />
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    themeSelector: state.themeSelector
  }
}

export default connect(mapStateToProps)(App);
