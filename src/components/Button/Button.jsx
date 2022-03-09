import React from 'react'
import './Button.scss';

const Button = (props) => {
  const onClick = () => {
    props.clickBtn(props.btnValue);
  }

  return (
    <div
      className={`btn ${props.btnName} ${props.btnColor}`}
      dangerouslySetInnerHTML={{ __html: props.btnText }}
      onClick={onClick}
    >
    </div>
  )
}

export default Button