import React from 'react';
import PropTypes from 'prop-types';

const CalculationType = ({ name, img, setCurrentType }) => {
  const onClick = () => {
    setCurrentType(name);
    console.log(name);
  }

  return (
    <div className='item' onClick={onClick}>
      <span><img src={img} /> {name} </span>
    </div>
  )
}

CalculationType.propTypes = {
  name: PropTypes.string,
  img: PropTypes.any,
  setCurrentType: PropTypes.func,
}

CalculationType.defaultProp = {
  name: '',
  img: null,
  setCurrentType: () => console.log('Не указана функция setCurrentType'),
}

export default CalculationType