import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChangeTypes from './ChangeTypes';
import { setAddItemCreator, setAddSectionCreator, setCurrentIconCreator, setCurrentTypeCreator, setDeleteItemCreator, setDeleteSectionCreator, setIconCreator, setIsMovingCreator, setMoveItemCreator, setMoveSectionCreator, setNameSectionCreator } from '../../redux/calculationTypesReducer';

const ChangesTypesContainer = (props) => {
  return (
    <ChangeTypes
      calcTypes={props.calculatorsType}
      setCurrentId={props.setCurrentId}
      currentId={props.currentId}
      disabledCalcs={props.disabledCalcs}
      onDeleteItem={props.onDeleteItem}
      onAddItem={props.onAddItem}
      onAddSection={props.onAddSection}
      onDeleteSection={props.onDeleteSection}
      onMoveItem={props.onMoveItem}
      onMoveSection={props.onMoveSection}
      setNameSection={props.setNameSection}
      setIconType={props.setIconType}
      onSetRenderWindow={props.onSetRenderWindow}
      handleSetCurrentImgName={props.handleSetCurrentImgName}
      setCurrentIcon={props.setCurrentIcon}
      isMoving={props.isMoving}
      setIsMoving={props.setIsMoving}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    calculatorsType: state.calculatorsType.types,
    currentId: state.calculatorsType.currentId,
    disabledCalcs: state.calculatorsType.disabledCalcs,
    isMoving: state.calculatorsType.isMoving,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentId: (id) => dispatch(setCurrentTypeCreator(id)),
    onDeleteItem: (section, id, name) => dispatch(setDeleteItemCreator(section, id, name)),
    onAddItem: (section, name) => dispatch(setAddItemCreator(section, name)),
    onAddSection: (name) => dispatch(setAddSectionCreator(name)),
    onDeleteSection: (id) => dispatch(setDeleteSectionCreator(id)),
    onMoveItem: (droppableIdStart, droppableIdEnd, indexStart, indexDrop) =>
      dispatch(setMoveItemCreator(
        droppableIdStart,
        droppableIdEnd,
        indexStart,
        indexDrop)
      ),
    onMoveSection: (indexStart, indexDrop) => dispatch(setMoveSectionCreator(indexStart, indexDrop)),
    setNameSection: (sectionId, name) => dispatch(setNameSectionCreator(sectionId, name)),
    setIconType: (id, imgName) => dispatch(setIconCreator(id, imgName)),
    setCurrentIcon: (name) => dispatch(setCurrentIconCreator(name)),
    setIsMoving: (boolean) => dispatch(setIsMovingCreator(boolean)),
  }
}

ChangesTypesContainer.propTypes = {
  calculatorsType: PropTypes.array,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onAddItem: PropTypes.func,
  onAddSection: PropTypes.func,
  onDeleteSection: PropTypes.func,
  onMoveItem: PropTypes.func,
  onMoveSection: PropTypes.func,
  setNameSection: PropTypes.func,
  onSetRenderWindow: PropTypes.func,
}

ChangesTypesContainer.defaultProps = {
  calculatorsType: {},
  currentType: '',
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  onDeleteItem: () => console.log('Не указана функция onDeleteItem'),
  onAddItem: () => console.log('Не указана функция onAddItem'),
  onAddSection: () => console.log('Не указана функция onAddSection'),
  onDeleteSection: () => console.log('Не указана функция onDeleteSection'),
  onMoveItem: () => console.log('Не указана функция onMoveItem'),
  onMoveSection: () => console.log('Не указана функция onMoveSection'),
  setNameSection: () => console.log('Не указана функция setNameSection'),
  onSetRenderWindow: () => console.log('Не указана функция onSetRenderWindow'),
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangesTypesContainer);