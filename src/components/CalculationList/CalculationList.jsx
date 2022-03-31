import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';
import interfaceElement from './interfaceElement';
import InputAndItemreverseSide from '../InputAndItemreverseSide/InputAndItemreverseSide';
import Select from '../Select/Select';
import { CALC_TYPES } from '../../variables';

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
  // Deleted section
  const onDeleteSection = () => {
    // setIsDeleted(true);
    console.log({ isRendering: true, currentType: 'delete', callBack: props.onDeleteSection, payload: props.sectionId });
    props.onSetRenderWindow({ isRendering: true, currentType: 'delete', callBack: props.onDeleteSection, payload: props.sectionId });
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
    <div className={cn('menu-calculation-list', { isDeleted: isDeleted })}>
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
  disabledCalcs: PropTypes.object,
  isEditMode: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onDeleteSection: PropTypes.func,
  sectionId: PropTypes.number,
  onSetCurrentSection: PropTypes.func,
  onSetCurrentItem: PropTypes.func,
  currentItem: PropTypes.object,
  setNameSection: PropTypes.func,
  onSetRenderWindow: PropTypes.func,
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
  onSetCurrentSection: () => console.log('Не определена функция onSetCurrentSection'),
  onSetCurrentItem: () => console.log('Не определена функция onSetCurrentItem'),
  setNameSection: () => console.log('Не определена функция setNameSection'),
  onSetRenderWindow: () => console.log('Не определена функция onSetRenderWindow'),
};

export default CalculationList