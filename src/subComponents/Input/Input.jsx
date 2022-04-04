import React from 'react';

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
}

export default InputCustom;