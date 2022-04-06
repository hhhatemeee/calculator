import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './CustomSelect.scss';

const CustomSelect = ({ value, options, onChange, handleIsOpen, isOpen }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleClick = () => handleIsOpen(!isOpen);

  useEffect(() => {
    setCurrentValue(value);
  }, [value])

  const handleClickValue = (e) => {
    setCurrentValue(e.target.innerText);
    onChange(e.target.innerText);
  };

  return (
    <div className='dropDown'>
      <div className={cn('dropDown__container', { 'dropDown__container_open': isOpen })}
        onClick={handleClick}>
        <div className='dropDown__title'>{currentValue}</div>
        <div className={cn('dropDown__list', { 'dropDown__list_open': isOpen })}>
          {
            options.map((value, i) => (
              <div
                key={i}
                className={cn('dropDown__item', { 'dropDown__item_current': currentValue === value })}
                onClick={handleClickValue}
              >
                <span className='dropDown__item-name'>{value}</span>
              </div>
            ))
          }
        </div>
        <div className={cn('dropDown__arrow', { 'dropDown__arrow_open': isOpen })}>{'<'}</div>
      </div>
    </div>
  )
}

CustomSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  handleIsOpen: PropTypes.func,
};

CustomSelect.defaultProps = {
  value: 'value',
  options: ['value'],
  isOpen: false,
  onChange: () => console.log('Не определена функция onChange'),
  handleIsOpen: () => console.log('Не определена функция handleIsOpen'),
};

export default CustomSelect;