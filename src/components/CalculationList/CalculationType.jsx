import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// Renders each menu item
const CalculationType = ({
  name,
  imgName,
  setCurrentId,
  currentId,
  handleShowMenu,
  disabledCalc,
  isEditMode,
  onDeleteItem,
  sectionId,
  id,
  setIconType,
  onSetRenderWindow,
  setCurrentIcon,
}) => {
  const [isDeleted, setDeleted] = useState(false);

  const [currentItemIcon, setCurrentItemIcon] = useState({ id, imgName });

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

  const setIcon = (name) => {
    setIconType({ id: id, imgName: name });
  };

  const handleSetCurrentId = () => {
    if (isEditMode) {
      setCurrentIcon(imgName);
      onSetRenderWindow({
        isRendering: true,
        currentType: 'icons',
        callBack: setIcon,
        currentItemIcon,
      })
    }
  };

  return (
    <div
      data-testid='typePoint'
      className={cn('item',
        { current: id === currentId },
        { isDisabled: disabledCalc && disabledCalc.isDisabled },
        { isEditMode: isEditMode },
        { isDeleted: isDeleted }
      )}
      onClick={onClick}
      draggable={false}
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
  isDisabled: PropTypes.object,
  isEditMode: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  sectionId: PropTypes.number,
  id: PropTypes.number,
  setIconType: PropTypes.func,
  onSetRenderWindow: PropTypes.func,
  setCurrentIcon: PropTypes.func,
}

CalculationType.defaultProps = {
  name: 'name',
  imgName: '',
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  handleShowMenu: () => console.log('Не указана функция setCurrentType'),
  currentType: '',
  isDisabled: { name: '', disabled: false },
  isEditMode: false,
  onDeleteItem: () => console.log('Не указана функция onDeleteItem'),
  sectionId: 0,
  id: 0,
  setIconType: () => console.log('Не определена функция setIconType,'),
  onSetRenderWindow: () => console.log('Не определена функция onSetRenderWindow,'),
  setCurrentIcon: () => console.log('Не определена функция setCurrentIcon,'),
}

export default CalculationType