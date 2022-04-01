import React from 'react';
import Select from '../../Select/Select';

const CalculationSelector = ({ options, onChange, onClick, defaultValue }) => {
  return (

    <div style={{ display: "inherit" }}>
      <Select options={options} onChange={onChange} defaultValue={defaultValue} />
      <div className='menu-calculation-list__btn-add' onClick={onClick}>
        Add
      </div>
    </div>

  )
}

export default CalculationSelector;