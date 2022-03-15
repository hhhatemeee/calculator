import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({
  btnValue,
  btnName,
  btnColor,
  btnText,
  onClick }) => {

  const click = () => {
    onClick(btnValue);
  }

  return (
    <div
      className={`btn ${btnName} ${btnColor}`}
      onClick={click}
    >
      {btnText}
    </div>
  )
}

Button.propTypes = {
  btnValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  btnName: PropTypes.string,
  btnColor: PropTypes.string,
  btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func,
}

Button.defaultProps = {
  btnValue: '',
  btnName: '',
  btnColor: '',
  btnText: '',
  onClick: () => console.log('Не указана функция OnClick'),
}

export default Button