import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Renders each menu item
const CalculationType = ({ name, imgName, setCurrentType, currentType, handleShowMenu, isDisabled, isEditMode, onDeleteItem, section }) => {
  //When selecting a calculator, hide the menu
  const onClick = () => {
    if (isEditMode) {
      return;
    }
    setCurrentType(name);
    handleShowMenu();
  }

  const onDelete = () => {
    onDeleteItem({ section: section, name: name });
  }
  return (
    <div
      data-testid='typePoint'
      className={cn('item', { current: name === currentType }, { isDisabled: isDisabled }, { isEditMode: isEditMode })}
      onClick={onClick}>
      <span className='item__row'><i className={`ico-${imgName}`}></i>{name}</span>
      {isEditMode && <span className='item__delete' onClick={onDelete}>+</span>}
    </div>
  )
}

CalculationType.propTypes = {
  name: PropTypes.string,
  imgName: PropTypes.string,
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  isDisabled: PropTypes.bool,
}

CalculationType.defaultProps = {
  name: 'name',
  imgName: '',
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  handleShowMenu: () => console.log('Не указана функция setCurrentType'),
  currentType: '',
  isDisabled: false,
}

export default CalculationType