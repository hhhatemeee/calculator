import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationList from '../CalculationList/CalculationList';

import './ChangeTypes.scss';


const ChangeTypes = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isAddSection, setAddSection] = useState(false);

  const onEditMode = () => {
    if (isAddSection) {
      setAddSection(false);
    }
    setEditMode(!isEditMode);
  };

  const onAddSection = () => setAddSection(!isAddSection);

  //  Modal window display handler
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='menu'>
      <div className={cn('menu__btn', { 'btn_open': showMenu })} onClick={handleShowMenu}>
        <span></span>
      </div>
      <div className={cn('menu__container', { 'menu__container_open': showMenu })}>
        <div className={cn('menu-list', { 'menu-list_open': showMenu })}>
          {Object.keys(props.calcTypes).map((type) => <CalculationList
            key={type}
            name={type}
            list={props.calcTypes[type]}
            setCurrentType={props.setCurrentType}
            currentType={props.currentType}
            handleShowMenu={handleShowMenu}
            disabledCalcs={props.disabledCalcs[type]}
            isEditMode={isEditMode}
            onDeleteItem={props.onDeleteItem}
            onAddItem={props.onAddItem} />)}
          {isEditMode &&
            (!isAddSection ? <div className='menu__add-section' onClick={onAddSection}>Add section...</div>
              : <input className='menu__input' type="text" name="" id="" />)}
          <i className='ico-Setting menu__setting' onClick={onEditMode} />
        </div>
      </div>
    </div>
  )
}

ChangeTypes.propTypes = {
  calcTypes: PropTypes.object,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.object,
};

ChangeTypes.defaultProps = {
  calcTypes: {},
  currentType: '',
  disabledCalcs: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
};

export default ChangeTypes;