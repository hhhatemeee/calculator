import React from 'react';
import cn from 'classnames';

import './ModalWindowWrapper.scss';

const ModalWindowWrapper = (props) => {
  return (
    <div className={cn('window-overlay', { 'open-window': props.boolean })}>
      <div className={cn('window', { 'open-window': props.boolean })}>
        <div className='window__header'>
          <h4 className='window__title'>
            {props.title}
          </h4>
          <span onClick={props.onClick}>+</span>
        </div>
        {props.children}
        <div className='window__button-line'>
          <button className='window__button' onClick={props.onClick}>OK</button>
        </div>
      </div>
    </div >
  )
}

export default ModalWindowWrapper;