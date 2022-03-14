import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationList from '../CalculationList/CalculationList';

import './ChangeTypes.scss';


const ChangeTypes = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className='menu__container'>
      <label className={cn({ 'label-open': showMenu })} onClick={handleShowMenu}>
        <span></span>
      </label>
      <div className={cn('menu', { 'menu-open': showMenu })}>
        {Object.keys(props.calcTypes).map((type) => <CalculationList
          key={type}
          name={type}
          list={props.calcTypes[type]}
          setCurrentType={props.setCurrentType} />)}
      </div>
    </div>
  )
}

ChangeTypes.propTypes = {
  calcTypes: PropTypes.object,
  setCurrentType: PropTypes.func,
};

ChangeTypes.defaultProp = {
  calcTypes: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
};

export default ChangeTypes;