import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './KeyBoardBasic.scss';

//draws a keyboard from which you can inherit
const KeyBoardBasic = (props) => {
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
            btnName={btn.name + ' calc-btn_basic'}
            btnColor={btn.name === 'btn_ac' ? ' ' : btn.color}
            btnText={btn.text}
            btnValue={btn.value}
            onClick={props.handleCurNum}
          />
        })
      }
    </div >
  )
}

KeyBoardBasic.propTypes = {
  buttons: PropTypes.array,
  handleCurNum: PropTypes.func.isRequired,
}

KeyBoardBasic.defaultProps = {
  buttons: [],
}

export default KeyBoardBasic;