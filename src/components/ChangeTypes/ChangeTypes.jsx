import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import CalculationList from '../CalculationList/CalculationList';

import './ChangeTypes.scss';


const ChangeTypes = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  //  Modal window display handler
  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <div className='menu'>
      <div className={cn('menu__btn', { 'btn_open': showMenu })} onClick={handleShowMenu}>
        <span></span>
      </div>
      <div className={cn('menu__container', { 'menu__container_open': showMenu })}>
        <div className={cn('menu-list', { 'menu-list_open': showMenu })}>
          {Object.keys(props.calcTypes).map((type) => <CalculationList
            key={type}
            name={type}
            list={props.calcTypes[type]}
            setCurrentType={props.setCurrentType}
            currentType={props.currentType}
            handleShowMenu={handleShowMenu}
            disabledCalcs={props.disabledCalcs[type]} />)}
        </div>
      </div>
    </div>
  )
}

ChangeTypes.propTypes = {
  calcTypes: PropTypes.object,
  setCurrentType: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.object,
};

ChangeTypes.defaultProps = {
  calcTypes: {},
  currentType: '',
  disabledCalcs: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
};

export default ChangeTypes;