import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Renders each menu item
const CalculationType = ({ name, imgName, setCurrentType, currentType, handleShowMenu, isDisabled }) => {
  //When selecting a calculator, hide the menu
  const onClick = () => {
    setCurrentType(name);
    handleShowMenu();
  }

  return (
    <div
      data-testid='typePoint'
      className={cn('item', { current: name === currentType }, { isDisabled: isDisabled })}
      onClick={onClick}>
      <span><i className={`ico-${imgName}`}></i>{name}</span>
    </div>
  )
}

CalculationType.propTypes = {
  name: PropTypes.string,
  img: PropTypes.any,
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  isDisabled: PropTypes.bool,
}

CalculationType.defaultProps = {
  name: 'name',
  img: null,
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  handleShowMenu: () => console.log('Не указана функция setCurrentType'),
  currentType: '',
  isDisabled: false,
}

export default CalculationType