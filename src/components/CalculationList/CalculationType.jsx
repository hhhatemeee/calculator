import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const CalculationType = ({ name, ImageSvg, setCurrentType, currentType }) => {

  const onClick = () => {
    setCurrentType(name);
  }

  return (
    <div className={cn('item', { current: name === currentType })} onClick={onClick}>
      <span>{ImageSvg}{name}</span>
    </div>
  )
}

CalculationType.propTypes = {
  name: PropTypes.string,
  img: PropTypes.any,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
}

CalculationType.defaultProp = {
  name: '',
  img: null,
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
  currentType: '',
}

export default CalculationType