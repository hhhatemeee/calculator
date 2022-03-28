import React from 'react';
import cn from 'classnames';

import './InputAndItemreverseSide.scss';

const InputAndItemreverseSide = ({
  isBoolean,
  onClick,
  onChange,
  value,
  onKeyDown,
  onBlur,
  nodeItem,
  text,
  isTitle,
  placeHolder }) => {

  return (
    <div className={cn('input-item', { isTitle: isTitle })}>
      {
        !isBoolean
          ? (nodeItem ? nodeItem : <div className='input-item__item-text' onClick={onClick}
          >{text}</div>)
          : <div className='input-item__container'>
            <input
              className='input-item__input'
              type="text"
              placeholder={placeHolder}
              value={value}
              onKeyDown={onKeyDown}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
      }
    </div>
  )
}

export default InputAndItemreverseSide;