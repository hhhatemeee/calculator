import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChangeTypes from './ChangeTypes';
import { setCurrentTypeCreator } from '../../redux/calculationTypesReducer';

const ChangesTypesContainer = (props) => {
  return (
    <ChangeTypes calcTypes={props.calculatorsType} setCurrentType={props.setCurrentType} currentType={props.currentType} />
  )
}

const mapStateToProps = (state) => {
  return {
    calculatorsType: state.calculatorsType.types,
    currentType: state.calculatorsType.currentType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentType: (name) => {
      dispatch(setCurrentTypeCreator(name))
    },
  }
}

ChangesTypesContainer.propTypes = {
  calculatorsType: PropTypes.object,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
}

ChangesTypesContainer.defaultProp = {
  calculatorsType: {},
  currentType: '',
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangesTypesContainer);