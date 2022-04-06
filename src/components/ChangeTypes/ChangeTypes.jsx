import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import CalculationList from '../CalculationList/CalculationList';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';

import './ChangeTypes.scss';

const ChangeTypes = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isAddSection, setAddSection] = useState(false);
  const [currentSection, setCurrentSection] = useState();
  const [currentItem, setCurrentItem] = useState();

  const handleShowMenuDown = (e) => {
    if (e.target.classList.contains('menu__btn')) {
      return;
    }
    if (!isEditMode) {
      let result;
      e.target.classList.forEach((name) => {
        if (name.includes('menu') || name.includes('item')) {
          result = true;
        }
      })
      result ? setShowMenu(true) : setShowMenu(false);
    }
  }

  const onEditMode = () => {
    if (isAddSection) {
      setAddSection(false);
    }

    setEditMode(!isEditMode);
  };

  const onIsAddSection = () => {
    setAddSection(!isAddSection);
  };

  const handleAddSection = () => {
    onIsAddSection();
    props.onSetRenderWindow({
      isRendering: true,
      currentType: 'addSection',
      callBack: props.onAddSection,
    })
  };

  //  Modal window display handler
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    setEditMode(false);
  }

  const onSetCurrentSection = (value) => setCurrentSection(value);
  const onSetCurrentItem = (value) => setCurrentItem(value);

  const handleDragEnd = (e) => {
    if (!e.destination) {
      return;
    }
    props.setIsMoving(true);

    if (e.type === 'item') {
      const { droppableId: droppableIdStart, index: indexStart } = e.source;
      const { droppableId: droppableIdEnd, index: indexDrop } = e.destination;

      props.onMoveItem({
        droppableIdStart,
        droppableIdEnd,
        indexStart,
        indexDrop,
      })
      setTimeout(() => props.setIsMoving(false), 100);

      return;
    }

    const { index: indexStart } = e.source;
    const { index: indexDrop } = e.destination;

    props.onMoveSection({
      indexStart, indexDrop
    });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} >
      <div className={cn('menu', { 'menu-open': showMenu })} onMouseDown={handleShowMenuDown}>
        <div className={cn('menu__btn', { 'btn_open': showMenu, 'menu__btn_hide': isEditMode })} onClick={handleShowMenu}>
          <span></span>
        </div>
        <div className={cn('menu__container', { 'menu__container_open': showMenu })}>
          <ModalWindowWrapper
            hide={isEditMode}
            boolean={isEditMode}
            title='Menu setting'
            onClick={onEditMode}
            button={<div className='menu__add-section' onClick={handleAddSection}>Add section...</div>}
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
                          disabledCalcs={props.disabledCalcs}
                          isEditMode={isEditMode}
                          onDeleteItem={props.onDeleteItem}
                          onAddItem={props.onAddItem}
                          onDeleteSection={props.onDeleteSection}
                          sectionId={el.id}
                          onSetCurrentSection={onSetCurrentSection}
                          onSetCurrentItem={onSetCurrentItem}
                          currentItem={currentItem}
                          setNameSection={props.setNameSection}
                          setIconType={props.setIconType}
                          onSetRenderWindow={props.onSetRenderWindow}
                          handleSetCurrentImgName={props.handleSetCurrentImgName}
                          setCurrentIcon={props.setCurrentIcon}
                          isMoving={props.isMoving}
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
          {showMenu && <div className='background'></div>}
        </div>
      </div >
    </DragDropContext >
  )
}

ChangeTypes.propTypes = {
  calcTypes: PropTypes.array,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.array,
  isMoving: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onAddSection: PropTypes.func,
  onDeleteSection: PropTypes.func,
  onMoveItem: PropTypes.func,
  onMoveSection: PropTypes.func,
  setNameSection: PropTypes.func,
  onSetRenderWindow: PropTypes.func,
  handleSetCurrentImgName: PropTypes.func,
  setCurrentIcon: PropTypes.func,
  setIsMoving: PropTypes.func,
};

ChangeTypes.defaultProps = {
  calcTypes: {},
  currentType: '',
  disabledCalcs: [],
  isMoving: false,
  handleSetCurrentImgName: () => console.log('Не определена функция handleSetCurrentImgName'),
  setCurrentIcon: () => console.log('Не определена функция setCurrentsetCurrentIconType'),
  setIsMoving: () => console.log('Не определена функция setIsMoving'),
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