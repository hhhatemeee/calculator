import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Input.scss';

const InputCustom = ({ placeHolder, value, onKeyDown, onChange, onBlur, className, isError, errorText }) => {
  return (
    <div className={cn(`input__container ${className || ''}`, { 'input__container_isError': isError })}>
      <div className={cn('input__error-message', { 'input__error-message_isShow': isError })}>
        <i className='ico-Info'></i>
        <span>{errorText}</span>
      </div>
      <input
        className={cn('input__item', { 'input__item_isError': isError })}
        type="text"
        placeholder={placeHolder}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
};

InputCustom.propTypes = {
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

InputCustom.defaultProps = {
  placeHolder: '',
  value: '',
  className: '',
  onChange: () => console.log('Не опеределена функция onChange'),
};


export default InputCustom;