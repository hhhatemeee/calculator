import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationList from '../CalculationList/CalculationList';

import './ChangeTypes.scss';
import InputAndItemreverseSide from '../InputAndItemreverseSide/InputAndItemreverseSide';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';
import IconList from '../IconList/IconList';


const ChangeTypes = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isAddSection, setAddSection] = useState(false);
  const [newSection, setNewSection] = useState('');
  const [currentSection, setCurrentSection] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [isShowSelectorIcon, setSelectorIcon] = useState(false);
  const [currentItemIcon, setCurrentItemIcon] = useState({});

  const onEditMode = () => {
    if (isAddSection) {
      setAddSection(false);
    }

    setEditMode(!isEditMode);
  };

  const onSenCurrentItemIcon = (id, imgName) => setCurrentItemIcon({
    id,
    imgName,
  });

  const onShowSelectorIcon = () => {
    setSelectorIcon(!isShowSelectorIcon);
  }

  const onAddSection = () => setAddSection(!isAddSection);

  const onChange = (e) => {
    setNewSection(e.target.value);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.onAddSection(newSection);
      setNewSection('');
    }

    if (e.keyCode === 27) {
      onAddSection(false);
    }
  }
  //  Modal window display handler
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    setEditMode(false);
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

  const onMoveSection = (dropIndex) => {
    props.onMoveSection({
      sectionIndexStart: currentSection,
      dropIndex,
    })
  };

  const setIcon = (name) => {
    props.setIconType({ id: currentItemIcon.id, imgName: name });
    // setSelectorIcon(false);
  };

  const onKeyDownWindow = (e) => {
    if (e.keyCode === 27) {
      setAddSection(false);
    }
  }

  return (
    <div className={cn('menu', { 'menu-open': showMenu })}>
      {/* Modal window for change icon  */}
      {isEditMode &&
        <ModalWindowWrapper
          className='window-icon__container'
          hide={true}
          title='Change icon'
          boolean={isShowSelectorIcon}
          onClick={onShowSelectorIcon}>
          <IconList setIcon={setIcon} currentItemIcon={currentItemIcon} />
        </ModalWindowWrapper>
      }
      <div className={cn('menu__btn', { 'btn_open': showMenu, 'menu__btn_hide': isEditMode })} onClick={handleShowMenu}>
        <span></span>
      </div>
      <div className={cn('menu__container', { 'menu__container_open': showMenu })}>
        <ModalWindowWrapper
          hide={isEditMode}
          boolean={isEditMode}
          onKeyDown={onKeyDownWindow}
          title='Menu setting'
          onClick={onEditMode}
          button={<InputAndItemreverseSide
            className='testitem'
            isBoolean={isAddSection}
            onChange={onChange}
            value={newSection}
            onKeyDown={onKeyDown}
            onBlur={onAddSection}
            placeHolder={'Section name'}
            nodeItem={<div className='menu__add-section' onClick={onAddSection}>Add section...</div>}
          />}
        >
          <div className={cn('menu-list', { 'menu-list_open': showMenu, 'menu-list_edit': isEditMode, 'deleted-anim': !(isEditMode && showMenu) })}>
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
                onSetCurrentItem={onSetCurrentItem}
                currentItem={currentItem}
                onMoveSection={onMoveSection}
                setNameSection={props.setNameSection}
                setIconType={props.setIconType}
                onSenCurrentItemIcon={onSenCurrentItemIcon}
                onShowSelectorIcon={onShowSelectorIcon}
              />
            })}
            {props.calcTypes.length === 0 && <div className='menu-list__empty-info'>Add a new section</div>}
            <div className='ico-Setting menu__setting' onClick={onEditMode} />
          </div>
        </ModalWindowWrapper>
      </div>
    </div >
  )
}

ChangeTypes.propTypes = {
  calcTypes: PropTypes.array,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onAddSection: PropTypes.func,
  onDeleteSection: PropTypes.func,
  onMoveItem: PropTypes.func,
  onMoveSection: PropTypes.func,
  setNameSection: PropTypes.func,
};

ChangeTypes.defaultProps = {
  calcTypes: {},
  currentType: '',
  disabledCalcs: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
  onDeleteItem: () => console.log('Не указана функция onDeleteItem'),
  onAddItem: () => console.log('Не указана функция onAddItem'),
  onAddSection: () => console.log('Не указана функция onAddSection'),
  onDeleteSection: () => console.log('Не указана функция onDeleteSection'),
  onMoveItem: () => console.log('Не указана функция onMoveItem'),
  onMoveSection: () => console.log('Не указана функция onMoveSection'),
  setNameSection: () => console.log('Не указана функция setNameSection'),
};

export default ChangeTypes;