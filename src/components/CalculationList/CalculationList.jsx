import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';
import interfaceElement from './interfaceElement';

import './CalculationList.scss';

// Draws a list of calculators, depending on the type
const CalculationList = (props) => {
  const [isAddItem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    section: props.name,
    name: '',
  })

  const onAddItem = () => setAddItem(!isAddItem);

  const onChange = (e) => {
    setNewItem({
      ...newItem,
      name: e.target.value,
    })
  }

  const addItem = () => {
    props.onAddItem(newItem)
  }
  return (
    <div className='menu-calculation-list'>
      <h3>{props.name}</h3>
      {
        props.list.map((calc) => <CalculationType
          isDisabled={props.disabledCalcs[calc.name]}
          key={calc.name}
          name={calc.name}
          imgName={calc.imgName}
          section={calc.section}
          setCurrentType={props.setCurrentType}
          currentType={props.currentType}
          handleShowMenu={props.handleShowMenu}
          isEditMode={props.isEditMode}
          onDeleteItem={props.onDeleteItem} />
        )
      }
      {!isAddItem ? <span className='menu-calculation-list__add-item' onClick={onAddItem}>Add item...</span>
        : <div>
          <input className='menu-calculation-list__input' type='text' onChange={onChange} />
          <button onClick={addItem} />
        </div>}
    </div>
  )
}

CalculationList.propTypes = {
  name: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape(interfaceElement)),
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.object,
};


CalculationList.defaultProps = {
  name: '',
  list: [],
  currentType: '',
  disabledCalcs: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
  handleShowMenu: () => console.log('Не определена функция setCurrentType'),
};

export default CalculationList