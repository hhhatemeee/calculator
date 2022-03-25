import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './Button.scss';

const Button = ({
  btnValue,
  btnName,
  btnColor,
  btnText,
  isStandart,
  onClick, }) => {

  const click = () => {
    onClick(btnValue);
  }

  return (
    <div
      className={cn(`btn ${btnName} ${btnColor}`,
        { 'mock-none': btnName.includes('mock') && isStandart })}
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
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  btnValue: '',
  btnName: '',
  btnColor: '',
  btnText: '',
}

export default Button