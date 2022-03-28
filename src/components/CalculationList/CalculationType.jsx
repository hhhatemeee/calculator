import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Renders each menu item
const CalculationType = ({
  name,
  imgName,
  setCurrentId,
  currentId,
  handleShowMenu,
  isDisabled,
  isEditMode,
  onDeleteItem,
  sectionId,
  id,
}) => {
  const [isDeleted, setDeleted] = useState(false);

  //When selecting a calculator, hide the menu
  const onClick = () => {
    if (isEditMode) {
      return;
    }

    setCurrentId({ id: id, name: name });
    handleShowMenu();
  }

  const onDelete = () => {
    setDeleted(true);
    setTimeout(() => onDeleteItem({
      sectionId: sectionId,
      id: id,
      name: name,
    }), 150);
  }


  return (
    <div
      data-testid='typePoint'
      className={cn('item',
        { current: id === currentId },
        { isDisabled: isDisabled },
        { isEditMode: isEditMode },
        { isDeleted: isDeleted }
      )}
      onClick={onClick}
    >
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