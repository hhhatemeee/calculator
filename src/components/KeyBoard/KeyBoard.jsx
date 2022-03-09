import React from 'react'
import Button from '../Button/Button';
import ButtonContainer from '../Button/ButtonContainer';
import './KeyBoard.scss';

const KeyBoard = (props) => {
  return (
    <div className='calc-buttons'>
      {
        props.buttonList.map((btn) => <ButtonContainer
          key={btn.value}
          btnName={btn.name}
          btnColor={btn.color}
          btnText={btn.text}
          btnValue={btn.value} />)
      }
    </div>
  )
}

export default KeyBoard;