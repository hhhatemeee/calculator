import React from 'react';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';

import './CalculationList.scss';

// Draws a list of calculators, depending on the type
const CalculationList = (props) => {
  return (
    <div className='calc__calculation-list'>
      <h3>{props.name}</h3>
      {
        props.list.map((calc) => <CalculationType
          isDisabled={props.isDisabled[calc.name]}
          key={calc.name}
          name={calc.name}
          ImageSvg={calc.img}
          setCurrentType={props.setCurrentType}
          currentType={props.currentType}
          handleShowMenu={props.handleShowMenu} />
        )
      }
    </div>
  )
}

CalculationList.propTypes = {
  name: PropTypes.string,
  list: PropTypes.array,
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  isDisabled: PropTypes.object,
};


CalculationList.defaultProp = {
  name: '',
  list: [],
  currentType: '',
  isDisabled: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
  handleShowMenu: () => console.log('Не определена функция setCurrentType'),
};

export default CalculationList