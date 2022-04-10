import React from 'react';
import PropTypes from 'prop-types';

import './CustomButton.scss';

const CustomButton = ({ onClick, text = 'Ok', type, className }) => {
  return (
    <div onClick={onClick} className={`${type} ${className}`}>
      {text}
    </div>
  )
}

CustomButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

CustomButton.defaultProps = {
  type: 'confirm',
  onClick: () => console.log('Не определена фукнция onClick'),
};

export default CustomButton;