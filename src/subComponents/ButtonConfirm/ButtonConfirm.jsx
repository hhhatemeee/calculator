import React from 'react';

import './ButtonConfirm.scss';

const ButtonConfirm = ({ onClick }) => {
  return (
    <div onClick={onClick} className='button-confirm'>
      Yes
    </div>
  )
}

export default ButtonConfirm;