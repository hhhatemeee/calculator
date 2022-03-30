import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';
import interfaceElement from './interfaceElement';

import './CalculationList.scss';
import InputAndItemreverseSide from '../InputAndItemreverseSide/InputAndItemreverseSide';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';
import Select from '../Select/Select';
import { CALC_TYPES } from '../../variables';

// Draws a list of calculators, depending on the type
const CalculationList = (props) => {
  const [isAddItem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    section: props.name,
    name: CALC_TYPES.Standart,
    sectionId: props.sectionId,
  });
  const [isEditSection, setEditSection] = useState(false);
  const [editNameSection, setEditNameSection] = useState(props.name);
  const [isDeleted, setIsDeleted] = useState(false);

  const onAddItem = () => setAddItem(!isAddItem);

  const handleSetNewItem = () => {
    props.onAddItem(newItem);
  }

  const handleSelectorSetItem = (e) => {
    const targetValue = e && e.target && e.target.value
      ? e.target.value
      : '';
    setNewItem({
      ...newItem,
      name: targetValue,
    });
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('item')) {
      e.target.style.boxShadow = '0px 1px 5px 1px gray inset';
      return;
    }
    if (e.target.classList.contains('menu-calculation-list')) {
      e.target.style.boxShadow = '0px 1px 5px 1px gray';
      e.target.style.zIndex = '100';
    }
  };

  const dragLeaveHandler = (e) => e.target.style.boxShadow = 'none';;

  const dragStartHandler = (e, sectionId, currentItem, currentIndex) => {
    console.log(e.target);
    props.onSetCurrentSection(sectionId);
    props.onSetCurrentItem({ currentItem, currentIndex });
    e.target.classList.add('animation-drag');
  };

  const dragEndHandler = (e) => e.target.classList.remove('animation-drag');

  const onDropHandler = (e, sectionId, dropIndex) => {
    e.preventDefault();
    if (props.currentItem) {
      e.target.style.boxShadow = 'none';
      e.target.classList.remove('animation-drag');


      props.onMoveItem({
        sectionIndexEnd: sectionId,
        dropIndex: dropIndex || 0,
      })
      props.onSetCurrentItem(null);
    }
  };

  const onDragStartSectionHandler = (e, sectionStart) => {
    e.target.classList.add('animation-drag');
    props.onSetCurrentSection(sectionStart);
  };

  const onDropSectionHandler = (e, sectionId) => {
    e.target.style.boxShadow = 'none';
    e.target.classList.remove('animation-drag');
    e.preventDefault();

    if (props.list.length === 0 && props.currentItem) {
      props.onMoveItem({
        sectionIndexEnd: sectionId,
        dropIndex: 0,
      })
      props.onSetCurrentItem(null);

      return;
    }
    if (!props.currentItem) {
      props.onMoveSection(sectionId);
      props.onSetCurrentSection({});
    }
  };

  // Deleted section
  const onDeleteSection = () => {
    setIsDeleted(true);
    setTimeout(() => props.onDeleteSection(props.sectionId), 150);
  };

  const onEditSectionTitle = () => setEditSection(!isEditSection);

  const onChangNameSection = (e) => setEditNameSection(e.target.value);


  const onKeyDownSetNameSection = (e) => {
    if (e && e.keyCode === 13) {
      props.setNameSection({
        name: editNameSection,
        sectionId: props.sectionId
      });
      onEditSectionTitle(false);
    }

    if (e && e.keyCode === 27) {
      onEditSectionTitle(false);
      setEditNameSection(props.name);
    }
  };

  const options = Object.keys(CALC_TYPES).map((calc) => ({ name: calc, value: calc }))

  return (
    <div className={cn('menu-calculation-list', { isDeleted: isDeleted })}
      draggable={props.isEditMode}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragStart={(e) => onDragStartSectionHandler(e, props.sectionIndex)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDrop={(e) => onDropSectionHandler(e, props.sectionIndex)}
    >
      <div className='menu-calculation-list__title-row'>
        <InputAndItemreverseSide
          isBoolean={isEditSection}
          isTitle={true}
          onClick={props.isEditMode ? onEditSectionTitle : null}
          onChange={onChangNameSection}
          value={editNameSection}
          onKeyDown={onKeyDownSetNameSection}
          onBlur={onEditSectionTitle}
          text={props.name}
          placeHolder={'Edit Section'}
        />
        {props.isEditMode && <i className='ico-Trash menu-calculation-list__title-delete' onClick={onDeleteSection} />}
      </div>
      {
        props.list.map((calc, index) => <div
          className='item-drag__container'
          key={calc.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e, props.sectionIndex, calc, index)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => onDropHandler(e, props.sectionIndex, index)}
          draggable={props.isEditMode}
        >
          <CalculationType
            isDisabled={props.disabledCalcs[calc.name]}
            key={calc.id}
            name={calc.name}
            imgName={calc.imgName}
            section={calc.section}
            setCurrentId={props.setCurrentId}
            currentId={props.currentId}
            handleShowMenu={props.handleShowMenu}
            isEditMode={props.isEditMode}
            onDeleteItem={props.onDeleteItem}
            id={calc.id}
            sectionId={props.sectionId}
            onSenCurrentItemIcon={props.onSenCurrentItemIcon}
            onShowSelectorIcon={props.onShowSelectorIcon}
          />
        </div>
        )
      }
      {props.isEditMode
        && (isAddItem ?
          <div className='menu-calculation-list__selector-container'>
            <Select options={options} onChange={handleSelectorSetItem} />
            <div className='menu-calculation-list__btn-add' onClick={handleSetNewItem}  >
              Add
            </div>
            <i className='ico-return' onClick={onAddItem} />
          </div>
          : <h4 className='menu-calculation-list_add-text' onClick={onAddItem}>Add item...</h4>)
      }
    </div >
  )
}

CalculationList.propTypes = {
  name: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape(interfaceElement)),
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.object,
  isEditMode: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onDeleteSection: PropTypes.func,
  sectionId: PropTypes.number,
  onMoveItem: PropTypes.func,
  onSetCurrentSection: PropTypes.func,
  onSetCurrentItem: PropTypes.func,
  currentItem: PropTypes.object,
  onMoveSection: PropTypes.func,
  setNameSection: PropTypes.func,
};


CalculationList.defaultProps = {
  name: '',
  list: [],
  currentType: '',
  disabledCalcs: {},
  currentItem: null,
  isEditMode: false,
  sectionId: 0,
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
  handleShowMenu: () => console.log('Не определена функция setCurrentType'),
  onDeleteItem: () => console.log('Не определена функция onDeleteItem'),
  onAddItem: () => console.log('Не определена функция onAddItem'),
  onDeleteSection: () => console.log('Не определена функция onDeleteSection'),
  onMoveItem: () => console.log('Не определена функция onMoveItem'),
  onSetCurrentSection: () => console.log('Не определена функция onSetCurrentSection'),
  onSetCurrentItem: () => console.log('Не определена функция onSetCurrentItem'),
  onMoveSection: () => console.log('Не определена функция onMoveSection'),
  setNameSection: () => console.log('Не определена функция setNameSection'),
};

export default CalculationList