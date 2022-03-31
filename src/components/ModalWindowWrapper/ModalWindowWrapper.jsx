import React from 'react';
import cn from 'classnames';

import './ModalWindowWrapper.scss';

const ModalWindowWrapper = (props) => {
  return (
    <div>
      {!props.hide ? props.children
        :
        <div
          className={cn(`window-overlay ${props.className}`, { 'open-window': props.boolean })}
          onKeyDown={props.onKeyDown}
          tabIndex={props.onKeyDown && -2}>
          <div className={cn('window', { 'open-window': props.boolean })}>
            <div className='window__header'>
              <h4 className='window__title'>
                {props.title}
              </h4>
              <span onClick={props.onClick}>+</span>
            </div>
            {props.children}
            <div className={cn({ 'window__buttons-inline': props.isInlineButtons })}>
              {props.button &&
                <div className={cn({ 'window__button-props': !props.isInlineButtons })}>
                  {props.button}
                </div>}
              <div className='window__button-line'>
                <button className='window__button' onClick={props.onClick}>{props.buttonText || 'OK'}</button>
              </div>
            </div>
          </div>
        </div >
      }
    </div >
  )
}

export default ModalWindowWrapper;