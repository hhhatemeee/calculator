import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const CalculationType = ({ name, ImageSvg, setCurrentType, currentType, handleShowMenu, isDisabled }) => {
  const onClick = () => {
    setCurrentType(name);
    handleShowMenu();
  }

  return (
    <div data-testid='typePoint' className={cn('item', { current: name === currentType }, { isDisabled: isDisabled })} onClick={onClick}>
      <span>{ImageSvg}{name}</span>
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

CalculationType.defaultProp = {
  name: '',
  img: null,
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  handleShowMenu: () => console.log('Не указана функция setCurrentType'),
  currentType: '',
  isDisabled: false,
}

export default CalculationType