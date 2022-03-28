import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

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

InputAndItemreverseSide.propTypes = {
  isBoolean: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  nodeItem: PropTypes.node,
  text: PropTypes.string,
  isTitle: PropTypes.bool,
  placeHolder: PropTypes.string,
}

InputAndItemreverseSide.defaultProps = {
  isBoolean: false,
  onClick: () => console.log('Ну указана функция onClick'),
  onChange: () => console.log('Ну указана функция onChange'),
  value: '',
  onKeyDown: () => console.log('Ну указана функция onKeyDown'),
  onBlur: () => console.log('Ну указана функция onBlur'),
  nodeItem: undefined,
  text: '',
  isTitle: false,
  placeHolder: '',
}

export default InputAndItemreverseSide;