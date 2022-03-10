import React from 'react'
import { OPERATORS } from '../../variables';
import './Button.scss';

const Button = (props) => {
  return (
    <div
      className={`btn ${props.btnName} ${props.btnColor}`}
      dangerouslySetInnerHTML={{ __html: props.btnText }}
      onClick={props.onClick}
    >
    </div>
  )
}

export default Button