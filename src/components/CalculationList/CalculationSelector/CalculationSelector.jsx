import React from 'react';
import Select from '../../Select/Select';

import './CalculationSelector.scss';

const CalculationSelector = ({ options, onChange, onClick, defaultValue, onClickReturn }) => {
  return (

    <div className='menu-calculation-list__selector-container'>
      <Select options={options} onChange={onChange} defaultValue={defaultValue} />
      <div className='menu-calculation-list__selector-row'>
        <div className='menu-calculation-list__btn-add' onClick={onClick}>
          Add
        </div>
        <i className='ico-return' onClick={onClickReturn} />
      </div>
    </div>

  )
}

export default CalculationSelector;