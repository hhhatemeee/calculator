import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChangeTypes from './ChangeTypes';
import { setCurrentTypeCreator } from '../../redux/calculationTypesReducer';

const ChangesTypesContainer = (props) => {
  return (
    <ChangeTypes calcTypes={props.calculatorsType} setCurrentType={props.setCurrentType} />
  )
}

const mapStateToProps = (state) => {
  return {
    calculatorsType: state.calculatorsType.types,
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
}

ChangesTypesContainer.defaultProp = {
  calculatorsType: {},
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangesTypesContainer);