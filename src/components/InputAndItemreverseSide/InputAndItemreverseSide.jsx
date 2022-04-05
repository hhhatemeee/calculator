import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './InputAndItemreverseSide.scss';
import InputCustom from '../../subComponents/Input/Input';

const InputAndItemreverseSide = ({
  isBoolean,
  className,
  onClick,
  onChange,
  value,
  onKeyDown,
  onBlur,
  nodeItem,
  text,
  isTitle,
  placeHolder }) => {
  const [isAnimated, setAnimated] = useState(false);

  const handleClick = () => {
    onClick();
    if (isBoolean) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 1000);
    }
  }

  const handleBlur = () => {
    onBlur();
    if (isBoolean) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 1000);
    }
  }
  return (
    <div className={cn(`input-item ${className ? className : ''}`, { isTitle: isTitle })}>
      {
        !isBoolean
          ? (nodeItem ? nodeItem : <div className={cn('input-item__item-text', { 'input-item__item-text_animate': isAnimated })} onClick={handleClick}
          >{text}</div>)
          : <InputCustom
            className='input-item__input'
            type="text"
            placeholder={placeHolder}
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onBlur={handleBlur}
          />
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
  value: '',
  nodeItem: undefined,
  text: '',
  isTitle: false,
  placeHolder: '',
  onClick: () => console.log('Ну указана функция onClick'),
  onChange: () => console.log('Ну указана функция onChange'),
  onKeyDown: () => console.log('Ну указана функция onKeyDown'),
  onBlur: () => console.log('Ну указана функция onBlur'),
}

export default InputAndItemreverseSide;