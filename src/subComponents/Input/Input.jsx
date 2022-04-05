import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const InputCustom = ({ placeHolder, value, onKeyDown, onChange, onBlur, className }) => {
  return (
    <div className={`input__container ${className || ''}`}>
      <input
        className='input__item'
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