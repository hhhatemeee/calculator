import React from 'react'
import Button from '../Button/Button';
import './KeyBoard.scss';

const KeyBoard = (props) => {
  return (
    <div className='calc-buttons'>
      {
        props.buttonList.map((btn) => <Button
          key={btn.value}
          btnName={btn.name}
          btnColor={btn.color}
          btnText={btn.text}
          btnValue={btn.value}
          onClick={props.onClick} />)
      }
    </div>
  )
}

export default KeyBoard;