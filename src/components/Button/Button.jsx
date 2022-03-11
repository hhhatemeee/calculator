import React from 'react'

import './Button.scss';

const Button = (props) => {

  const click = () => {
    props.onClick(props.btnValue);
  }

  return (
    <div
      className={`btn ${props.btnName} ${props.btnColor}`}
      dangerouslySetInnerHTML={{ __html: props.btnText }}
      onClick={click}
    >
    </div>
  )
}

export default Button