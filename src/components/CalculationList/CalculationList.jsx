import React, { useEffect, useState } from 'react';
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
    sectionId: props.sectionId,
  });

  const onAddItem = () => setAddItem(!isAddItem);

  const onChange = (e) => {

    setNewItem({
      ...newItem,
      name: e.target.value,
    })
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.onAddItem(newItem);
      setNewItem({
        ...newItem,
        name: '',
      })
    }
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('item')) {
      e.target.style.boxShadow = '0px 1px 5px 1px gray inset';
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
    e.target.classList.remove('animation-drag');

  };

  const dragStartHandler = (e, sectionId, currentItem, currentIndex) => {
    props.onSetCurrentSection(sectionId);
    props.onSetCurrentItem({ currentItem, currentIndex });
    e.target.classList.add('animation-drag');
  };

  const dragEndHandler = (e) => {
    e.target.classList.remove('animation-drag');

  }

  const onDropHandler = (e, sectionId, dropIndex) => {
    e.preventDefault();
    e.target.style.boxShadow = 'none';
    e.target.classList.remove('animation-drag');

    props.onMoveItem({
      sectionIndexEnd: sectionId,
      dropIndex: dropIndex || 0,
    })
    props.onSetCurrentItem({});
  }

  const onDeleteSection = () => props.onDeleteSection(props.sectionId);

  return (
    <div className='menu-calculation-list'
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => props.list.length === 0 && onDropHandler(e, props.sectionIndex)}>
      <h3 onClick={onDeleteSection}>{props.name}</h3>
      {
        props.list.map((calc, index) => <div
          className='item-drag__container'
          key={calc.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e, props.sectionIndex, calc, index)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => onDropHandler(e, props.sectionIndex, index)}
          draggable={props.isEditMode}
        >
          <CalculationType
            isDisabled={props.disabledCalcs[calc.name]}
            key={calc.id}
            name={calc.name}
            imgName={calc.imgName}
            section={calc.section}
            setCurrentId={props.setCurrentId}
            currentId={props.currentId}
            handleShowMenu={props.handleShowMenu}
            isEditMode={props.isEditMode}
            onDeleteItem={props.onDeleteItem}
            id={calc.id}
            sectionId={props.sectionId}
          />
        </div>
        )
      }
      {props.isEditMode
        && (!isAddItem ? <span
          className='menu-calculation-list__add-item'
          onClick={onAddItem}
        >Add item...</span>
          : <div>
            <input
              className='menu-calculation-list__input'
              type='text'
              onKeyDown={onKeyDown}
              onChange={onChange}
              onBlur={onAddItem}
              value={newItem.name} />
          </div>)}
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