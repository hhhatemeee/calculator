import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationList from '../CalculationList/CalculationList';

import './ChangeTypes.scss';


const ChangeTypes = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isAddSection, setAddSection] = useState(false);
  const [newSection, setNewSection] = useState('');
  const [currentSection, setCurrentSection] = useState();
  const [currentItem, setCurrentItem] = useState();

  const onEditMode = () => {
    if (isAddSection) {
      setAddSection(false);
    }
    setEditMode(!isEditMode);
  };

  const onAddSection = () => setAddSection(!isAddSection);

  const onChange = (e) => {
    setNewSection(e.target.value);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.onAddSection(newSection);
    }
  }
  //  Modal window display handler
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const onSetCurrentSection = (value) => setCurrentSection(value);
  const onSetCurrentItem = (value) => setCurrentItem(value);

  const onMoveItem = ({ sectionIndexEnd, dropIndex }) => {
    props.onMoveItem({
      sectionIndexStart: currentSection,
      sectionIndexEnd,
      currentItem: currentItem.currentItem,
      dropIndex,
      currentIndex: currentItem.currentIndex,
    })
  }
  return (
    <div className='menu'>
      <div className={cn('menu__btn', { 'btn_open': showMenu })} onClick={handleShowMenu}>
        <span></span>
      </div>
      <div className={cn('menu__container', { 'menu__container_open': showMenu })}>
        <div className={cn('menu-list', { 'menu-list_open': showMenu })}>
          {props.calcTypes.map((el, index) => {
            return <CalculationList
              key={el.id}
              name={el.name}
              list={el.calcList}
              sectionIndex={index}
              setCurrentId={props.setCurrentId}
              currentId={props.currentId}
              handleShowMenu={handleShowMenu}
              disabledCalcs={props.disabledCalcs[el.name]}
              isEditMode={isEditMode}
              onDeleteItem={props.onDeleteItem}
              onAddItem={props.onAddItem}
              isEditMode={isEditMode}
              onDeleteSection={props.onDeleteSection}
              sectionId={el.id}
              onMoveItem={onMoveItem}
              onSetCurrentSection={onSetCurrentSection}
              onSetCurrentItem={onSetCurrentItem} />
          }
          )}
          {isEditMode &&
            (!isAddSection ? <div className='menu__add-section' onClick={onAddSection}>Add section...</div>
              : <input
                className='menu__input'
                type="text"
                value={newSection}
                onKeyDown={onKeyDown}
                onChange={onChange}
              />)}
          <i className='ico-Setting menu__setting' onClick={onEditMode} />
        </div>
      </div>
    </div>
  )
}

ChangeTypes.propTypes = {
  calcTypes: PropTypes.array,
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