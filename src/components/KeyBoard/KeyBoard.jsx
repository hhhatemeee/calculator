import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './KeyBoard.scss';

const KeyBoard = ({ buttons, onClick }) => {
  return (
    <div className='calc-buttons'>
      {
        buttons.map((btn) => <Button
          key={btn.value}
          btnName={btn.name}
          btnColor={btn.color}
          btnText={btn.text}
          btnValue={btn.value}
          onClick={onClick} />)
      }
    </div>
  )
}

KeyBoard.propTypes = {
  buttons: PropTypes.array,
  onClick: PropTypes.func,
};

KeyBoard.defaultProp = {
  buttons: [],
  onClick: () => console.log('Не указана функция onClick'),
};

export default KeyBoard;