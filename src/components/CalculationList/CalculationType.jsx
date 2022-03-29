import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CALC_NAMES } from '../../variables';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';

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
  onShowSelectorIcon,
  onSenCurrentItemIcon,
}) => {
  const [isDeleted, setDeleted] = useState(false);


  useEffect(() => onSenCurrentItemIcon(id, imgName), [imgName]);

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

  const handleSetCurrentId = () => {
    onShowSelectorIcon();
    onSenCurrentItemIcon(id, imgName)
  };

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
      <span className={cn('item-row', { 'icon-edit': isEditMode })}>

        <i className={`ico-${imgName} item-row__item`} onClick={handleSetCurrentId} />
        {name}
      </span>
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
  isEditMode: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  sectionId: PropTypes.number,
  id: PropTypes.number,
}

CalculationType.defaultProps = {
  name: 'name',
  imgName: '',
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  handleShowMenu: () => console.log('Не указана функция setCurrentType'),
  currentType: '',
  isDisabled: false,
  isEditMode: false,
  onDeleteItem: () => console.log('Не указана функция onDeleteItem'),
  sectionId: 0,
  id: 0,
}

export default CalculationType