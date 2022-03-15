import React from 'react';
import Button from '../Button/Button';

import './KeyBoardOther.scss';

const KeyBoardOther = (props) => {
  const exceptions = ['btn_percent', 'btn_plus-minus', 'btn_multiplication', 'btn_minus', 'btn_plus', 'btn_equal', 'btn_division'];

  return (
    <div className='keyboard' >
      {
        props.buttons.map((btn) => {
          if (exceptions.includes(btn.name)) {
            return;
          }
          return <Button
            key={btn.value}
            btnName={btn.name}
            btnColor={btn.name === 'btn_ac' ? ' ' : btn.color}
            btnText={btn.text}
            btnValue={btn.value}
            onClick={props.handleCurNum}
            width={100}
          />
        })
      }
    </div >
  )
}

export default KeyBoardOther;