import React from 'react';
import PropTypes from 'prop-types';

import './ButtonConfirm.scss';

const ButtonConfirm = ({ onClick }) => {
  return (
    <div onClick={onClick} className='button-confirm'>
      Yes
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