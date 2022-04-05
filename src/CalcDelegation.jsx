import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CalculatorContainer from './components/Calculator/CalculatorContainer';
import ModalWindow from './components/ModalWindow/ModalWindow';
import HomePage from './components/HomePage/HomePage';
import ConverterContainer from './components/Converter/ConverterContainer';
import { CALC_TYPES } from './variables';
import ModalWindowWrapper from './components/ModalWindowWrapper/ModalWindowWrapper';
import WindowDelete from './components/WindowDelete/WindowDelete';
import IconList from './components/IconList/IconList';
import AddSectionWindow from './components/ChangeTypes/AddSectionWindow/AddSectionWindow';

const CalcDelegation = (props) => {
  const [currentKey, setCurrentKey] = useState({});
  const [isShowWindow, setShowWindow] = useState(false);
  let calculator;
  let modalWindow;

  const handleShowWindow = () => setShowWindow(!isShowWindow);

  useEffect(() => { }, [props.listLimit])

  useEffect(() => {
    if (props.renderWindow) {
      setShowWindow(true);
    }
  }, [props.renderWindow])

  // Selects which type of calculator to render
  switch (props.currentType) {
    case CALC_TYPES.Standart:
      calculator = <CalculatorContainer currentKey={currentKey} />;
      break;
    case CALC_TYPES.Currency:
      calculator = <ConverterContainer
        currentKey={currentKey}
        listLimit={props.listLimit}
      />
      break;
    default:
      calculator = <HomePage setCurrentType={props.setCurrentType} />
      break;
  };

  // Selects which type of modal window to render
  switch (props.renderWindow.currentType) {
    case 'icons':
      const handleSetIcon = (name) => {
        props.renderWindow.callBack(name);
      }

      modalWindow = <ModalWindowWrapper
        className='window-icon__container'
        hide={true}
        title='Change icon'
        boolean={isShowWindow}
        onClick={handleShowWindow}>
        <IconList setIcon={handleSetIcon} currentImgName={props.currentImgName} />
      </ModalWindowWrapper>

      break;
    case 'limit':
      modalWindow = <ModalWindow
        showWindow={props.showWindow}
        listLimit={props.listLimit}
        onClick={props.onClick}
        url={props.url}
        setCurrentService={props.setCurrentService}
      />
      break;
    case 'delete':
      const handleClick = () => {
        props.renderWindow.callBack(props.renderWindow.payload);
        setShowWindow(false);
      }

      modalWindow = <WindowDelete
        onClick={handleClick}
        boolean={isShowWindow}
        handleBoolean={handleShowWindow}
      />
      break;
    case 'addSection':
      const handleAddSection = (value) => {
        props.renderWindow.callBack(value);
        setShowWindow(false);
      }

      modalWindow = <AddSectionWindow
        boolean={isShowWindow}
        handleBoolean={handleShowWindow}
        onClickButton={handleAddSection}
      />
    default:
      break;
  };

  const onKeyDown = (e) => setCurrentKey(e);

  return (
    <div className='calc-delegation__conatiner' tabIndex='-1' onKeyDown={onKeyDown}>
      {calculator}
      {props.renderWindow.isRendering && modalWindow}
    </div>
  )
}

CalcDelegation.propTypes = {
  renderWindow: PropTypes.object,
  showWindow: PropTypes.bool,
  listLimit: PropTypes.array,
  url: PropTypes.string,
  currentKey: PropTypes.object,
  onClick: PropTypes.func,
  setCurrentType: PropTypes.func,
  currentImgName: PropTypes.string,
  setCurrentService: PropTypes.func,
};

CalcDelegation.defaultProps = {
  renderWindow: {},
  showWindow: false,
  listLimit: [],
  url: '',
  currentKey: {},
  currentImgName: '',
  setCurrentService: () => console.log('Не указана функция setCurrentService'),
  onClick: () => console.warn('Не указана функция onClick'),
  setCurrentType: () => console.warn('Не указана функция setCurrentType'),
}

export default CalcDelegation