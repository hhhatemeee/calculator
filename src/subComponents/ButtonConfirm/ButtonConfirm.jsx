import React from 'react';
import PropTypes from 'prop-types';

import './ButtonConfirm.scss';

const ButtonConfirm = ({ onClick, text = 'Ok' }) => {
  return (
    <div onClick={onClick} className='button-confirm'>
      {text}
    </div>
  )
}

ButtonConfirm.propTypes = {
  onClick: PropTypes.func,
};

ButtonConfirm.defaultProps = {
  onClick: () => console.log('Не определена фукнция onClick'),
};

export default ButtonConfirm;