import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import CalculationList from '../CalculationList/CalculationList';
import InputAndItemreverseSide from '../InputAndItemreverseSide/InputAndItemreverseSide';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';
import IconList from '../IconList/IconList';

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
    if (e.keyCode === 13 && newSection.length > 0) {
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

  const onKeyDownWindow = (e) => {
    if (e.keyCode === 27) {
      setAddSection(false);
    }
  }

  const handleDragEnd = (e) => {
    if (!e.destination) {
      return;
    }

    if (e.type === 'item') {
      const { droppableId: droppableIdStart, index: indexStart } = e.source;
      const { droppableId: droppableIdEnd, index: indexDrop } = e.destination;

      props.onMoveItem({
        droppableIdStart,
        droppableIdEnd,
        indexStart,
        indexDrop,
      })

      return;
    }

    const { index: indexStart } = e.source;
    const { index: indexDrop } = e.destination;

    props.onMoveSection({
      indexStart, indexDrop
    });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={cn('menu', { 'menu-open': showMenu })}>
        {/* Modal window for change icon  */}
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
            <Droppable type="section" droppableId="container">
              {(provided) => (
                <div className={cn('menu-list',
                  {
                    'menu-list_open': showMenu,
                    'menu-list_edit': isEditMode,
                    'menu-list_empty': props.calcTypes.length === 0 && isEditMode,
                    'deleted-anim': !(isEditMode && showMenu),
                  })}
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {props.calcTypes.map((el, index) => <Draggable
                    key={el.id}
                    index={index}
                    draggableId={el.name.toString()}
                    isDragDisabled={!isEditMode}
                  >
                    {(provided) => (
                      <div
                        className='menu-list__draggble-container'
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                      >
                        <CalculationList
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
                          onSetCurrentSection={onSetCurrentSection}
                          onSetCurrentItem={onSetCurrentItem}
                          currentItem={currentItem}
                          setNameSection={props.setNameSection}
                          setIconType={props.setIconType}
                          onSetRenderWindow={props.onSetRenderWindow}
                          setIconType={props.setIconType}
                          handleSetCurrentImgName={props.handleSetCurrentImgName}
                          setCurrentIcon={props.setCurrentIcon}
                        />
                      </div>
                    )}
                  </Draggable>
                  )}
                  {props.calcTypes.length === 0 && <div className='menu-list__empty-info'>Add a new section</div>}
                  {provided.placeholder}
                  <div className='ico-Setting menu__setting' onClick={onEditMode} />
                </div>
              )}
            </Droppable>
          </ModalWindowWrapper>
        </div>
      </div >
    </DragDropContext>
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
  onSetRenderWindow: PropTypes.func,
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
  onSetRenderWindow: () => console.log('Не указана функция onSetRenderWindow'),
};

export default ChangeTypes;