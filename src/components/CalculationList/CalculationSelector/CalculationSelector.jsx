import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../Select/Select';

import './CalculationSelector.scss';
import optionsInterface from '../../Select/SelectInterface';

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

CalculationSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionsInterface)).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClickReturn: PropTypes.func,
};

CalculationSelector.defaultProps = {
  defaultValue: '',
  onChange: () => console.log('Не опеределена функция onChange'),
  onClick: () => console.log('Не опеределена функция onClick'),
  onClickReturn: () => console.log('Не опеределена функция onClickReturn'),
};

export default CalculationSelector;