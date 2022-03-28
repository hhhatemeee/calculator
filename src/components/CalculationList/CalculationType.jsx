import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CALC_NAMES } from '../../variables';

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
  setIconType,
}) => {
  const [isDeleted, setDeleted] = useState(false);
  const [isShowSelectorIcon, setSelectorIcon] = useState(false);


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

  const onShowSelectorIcon = () => setSelectorIcon(!isShowSelectorIcon);


  const setIcon = (name) => {
    setIconType({ id: id, imgName: name });
    setSelectorIcon(false);
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
      <span className={cn('item-row', { 'icon-edit': isEditMode, 'show-selector': isShowSelectorIcon })}>
        <div className='item__selector-ico'>
          {
            CALC_NAMES.map((name) => <i
              key={name}
              className={`ico-${name} icon`}
              onClick={() => setIcon(name)}
            />)
          }
        </div>
        <i className={`ico-${imgName} item-row__item`} onClick={onShowSelectorIcon} />
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