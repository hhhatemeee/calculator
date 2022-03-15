import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';

import './CalculationList.scss';

const CalculationList = (props) => {
  return (
    <div className='calc__calculation-list'>
      <h3>{props.name}</h3>
      {
        props.list.map((calc) => {
          return <CalculationType
            key={calc.name}
            name={calc.name}
            ImageSvg={calc.img}
            setCurrentType={props.setCurrentType}
            currentType={props.currentType} />
        })
      }
    </div>
  )
}

CalculationType.propTypes = {
  name: PropTypes.string,
  list: PropTypes.array,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
};


CalculationType.defaultProp = {
  name: '',
  list: [],
  currentType: '',
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
};

export default CalculationList