import React from 'react';
import PropTypes from 'prop-types';

import './HoverWindow.scss';

const HoverWindow = ({ className, children, position }) => {
  return (
    <div className={`hover-window ${position || ''} ${className || ''}`}>
      {children}
    </div>
  )
}

HoverWindow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
}

HoverWindow.defaultProps = {
  className: '',
  position: 'right',
}



export default HoverWindow