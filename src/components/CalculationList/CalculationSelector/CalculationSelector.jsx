import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CustomSelect from '../../../subComponents/CustomSelect/CustomSelect';
import CustomButton from '../../../subComponents/CustomButton/CustomButton';

import './CalculationSelector.scss';


const CalculationSelector = ({
  options,
  onChange,
  onClick,
  value,
  onClickReturn,
  handleIsOpen,
  isOpen,
  isAnimated }) => {
  const handleClick = () => {
    onClick();
    onClickReturn();
  }

  return (
    <div className={cn('menu-calculation-list__selector-container', { 'menu-calculation-list__selector-container_animate': isAnimated })} >
      <div className='menu-calculation-list__select-container'>
        <CustomSelect
          options={options}
          onChange={onChange}
          value={value}
          handleIsOpen={handleIsOpen}
          isOpen={isOpen}
        />
      </div>
      <div className='menu-calculation-list__selector-row'>
        <CustomButton className='menu-calculation-list__btn-add' text='Add' type='added' onClick={handleClick} />
        <i className='ico-return' onClick={onClickReturn} />
      </div>
    </div >

  )
}

CalculationSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool,
  isAnimated: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClickReturn: PropTypes.func,
  handleIsOpen: PropTypes.func,
};

CalculationSelector.defaultProps = {
  value: 'value',
  isOpen: false,
  isAnimated: false,
  onChange: () => console.log('Не опеределена функция onChange'),
  onClick: () => console.log('Не опеределена функция onClick'),
  onClickReturn: () => console.log('Не опеределена функция onClickReturn'),
  handleIsOpen: () => console.log('Не опеределена функция handleIsOpen'),
};

export default CalculationSelector;