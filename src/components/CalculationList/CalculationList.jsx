import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';
import interfaceElement from './interfaceElement';
import InputAndItemreverseSide from '../InputAndItemreverseSide/InputAndItemreverseSide';
import { CALC_TYPES } from '../../variables';
import CalculationSelector from './CalculationSelector/CalculationSelector';
import CustomButton from '../../subComponents/CustomButton/CustomButton';

import './CalculationList.scss';


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
  const [isAnimated, setAnimated] = useState(false);
  const [currentTypeInSelector, setCurrentTypeInSelector] = useState('Standart');
  const [selectIsOpen, setSelectOpen] = useState(false);
  const [editSectionError, setSectionError] = useState(false);

  useEffect(() => {
    if (props.options.length >= 1) {
      setNewItem({ ...newItem, name: props.options.at(-1) });
      setCurrentTypeInSelector(props.options.at(-1));
    }
  }, [props.options]);

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseOpenSelect);

    return () => document.removeEventListener('mousedown', handleMouseOpenSelect)
  });

  const onSetSelectOpen = (value) => setSelectOpen(value);

  // Close selector on click past
  const handleMouseOpenSelect = (e) => {
    let result;

    e.target.classList.forEach((name) => {
      if (name.includes('dropDown')) {
        result = true;
      }
    })

    result ? setSelectOpen(selectIsOpen) : setSelectOpen(false);
  }

  const onAddItem = () => {
    setAddItem(!isAddItem);

    if (isAddItem) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 1000);
    }
  }

  const handleSetNewItem = () => {
    props.onAddItem(newItem);
  }

  const handleSelectorSetItem = (value) => {
    setCurrentTypeInSelector(value);
    setNewItem({
      ...newItem,
      name: value,
    });
  }

  // Deleted section
  const onDeleteSection = () => props.onSetRenderWindow({
    isRendering: true,
    currentType: 'delete',
    callBack: props.onDeleteSection,
    payload: props.sectionId
  });

  const onEditSectionTitle = () => {
    if (!editNameSection.trim()) {
      setEditNameSection(props.name);
    }
    setEditSection(!isEditSection);
    setSectionError(false);
  }

  const onChangNameSection = (e) => {
    setEditNameSection(e.target.value);
    setSectionError(false);
  };

  const handleSaveSection = () => {
    if (editNameSection.trim()) {
      props.setNameSection({
        name: editNameSection,
        sectionId: props.sectionId
      });

      onEditSectionTitle(false);

      return;
    }

    setSectionError(true);
  };

  return (
    <div className='menu-calculation-list'>
      <div className='menu-calculation-list__title-row'>
        <InputAndItemreverseSide
          isBoolean={isEditSection}
          isTitle={true}
          onChange={onChangNameSection}
          value={editNameSection}
          onClick={props.isEditMode ? onEditSectionTitle : () => false}
          text={props.name}
          placeHolder={'Edit Section'}
          className='menu-calculation-list__edit-input'
          isError={editSectionError}
        />
        {isEditSection && <div className='menu-calculation-list_edit-btn' onClick={handleSaveSection}>Save</div>}
        {props.isEditMode &&
          (isEditSection ? <i className='ico-return menu-calculation-list__return' onClick={onEditSectionTitle} />
            : <i className='ico-Trash menu-calculation-list__title-delete' onClick={onDeleteSection} />)}
      </div>
      <Droppable droppableId={props.sectionId.toString()} type="item">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              props.list.map((calc, index) => <Draggable
                key={calc.id}
                index={index}
                draggableId={calc.id.toString()}
                isDragDisabled={!props.isEditMode}
              >
                {(provided) => (
                  <div
                    className='item__draggble-container'
                    key={calc.id}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <CalculationType
                      disabledCalc={props.disabledCalcs.filter((disCalc) => disCalc.disabled && disCalc.name === calc.name)[0]}
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
                      setIconType={props.setIconType}
                      onSetRenderWindow={props.onSetRenderWindow}
                      handleSetCurrentImgName={props.handleSetCurrentImgName}
                      setCurrentIcon={props.setCurrentIcon}
                    />
                  </div>
                )}
              </Draggable>
              )}
            {provided.placeholder}
            {props.isEditMode
              && (props.options.length > 0 ?
                (isAddItem ?
                  <CalculationSelector
                    options={props.options}
                    onChange={handleSelectorSetItem}
                    onClick={handleSetNewItem}
                    value={currentTypeInSelector}
                    handleIsOpen={onSetSelectOpen}
                    isOpen={selectIsOpen}
                    onClickReturn={onAddItem}
                    isAnimated={isAnimated}
                  />
                  : <h4 className={cn('menu-calculation-list__add-text', { 'menu-calculation-list__add-text_animate': isAnimated })}
                    onClick={onAddItem}>Add item...</h4>)
                : <div className='menu-calculation-list__space'>space</div>)
            }
          </div>
        )}
      </Droppable>
    </div >
  )
}

CalculationList.propTypes = {
  name: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape(interfaceElement)),
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.array,
  isEditMode: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onDeleteSection: PropTypes.func,
  sectionId: PropTypes.number,
  onSetCurrentItem: PropTypes.func,
  currentItem: PropTypes.object,
  setNameSection: PropTypes.func,
  onSetRenderWindow: PropTypes.func,
};


CalculationList.defaultProps = {
  name: '',
  list: [],
  currentType: '',
  disabledCalcs: [],
  currentItem: null,
  isEditMode: false,
  sectionId: 0,
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
  handleShowMenu: () => console.log('Не определена функция setCurrentType'),
  onDeleteItem: () => console.log('Не определена функция onDeleteItem'),
  onAddItem: () => console.log('Не определена функция onAddItem'),
  onDeleteSection: () => console.log('Не определена функция onDeleteSection'),
  onSetCurrentItem: () => console.log('Не определена функция onSetCurrentItem'),
  setNameSection: () => console.log('Не определена функция setNameSection'),
  onSetRenderWindow: () => console.log('Не определена функция onSetRenderWindow'),
};

export default CalculationList