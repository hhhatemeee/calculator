import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChangeTypes from './ChangeTypes';
import { setAddItemCreator, setAddSectionCreator, setCurrentTypeCreator, setDeleteItemCreator, setDeleteSectionCreator, setMoveItemCreator } from '../../redux/calculationTypesReducer';

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
      onMoveItem={props.onMoveItem} />
  )
}

const mapStateToProps = (state) => {
  return {
    calculatorsType: state.calculatorsType.types,
    currentId: state.calculatorsType.currentId,
    disabledCalcs: state.calculatorsType.disabledCalcs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentId: (id) => dispatch(setCurrentTypeCreator(id)),
    onDeleteItem: (section, name) => dispatch(setDeleteItemCreator(section, name)),
    onAddItem: (section, name) => dispatch(setAddItemCreator(section, name)),
    onAddSection: (name) => dispatch(setAddSectionCreator(name)),
    onDeleteSection: (id) => dispatch(setDeleteSectionCreator(id)),
    onMoveItem: (sectionIndexStart, sectionIndexEnd, currentItem, dropIndex, currentIndex) =>
      dispatch(setMoveItemCreator(
        sectionIndexStart,
        sectionIndexEnd,
        currentItem,
        dropIndex,
        currentIndex)
      ),
  }
}

ChangesTypesContainer.propTypes = {
  calculatorsType: PropTypes.array,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
}

ChangesTypesContainer.defaultProps = {
  calculatorsType: {},
  currentType: '',
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangesTypesContainer);