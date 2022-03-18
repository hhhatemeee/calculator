import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import splittingNumber from '../../helpers/splittingNumber';
import ScreenLine from './ScreenLine';

import './ScreenOther.scss';

// Draws a screen from which you can inherit
const ScreenOther = (props) => {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(props.currencyList);

  }, [props.currencyList]);

  useEffect(() => {
    props.setCurrentCourse(props.to.name);
  }, [])

  // Handler for displaying the number to be converted
  const handleFrom = (e) => {
    props.handleBasicCurrency(e.target.value);
    props.setCurrentCourse(props.to.name);

    // Display currency icon
    if (Object.keys(props.CURRENCY_TABLE).includes(e.target.value)) {
      props.setFromValue({
        name: e.target.value,
        value: props.CURRENCY_TABLE[e.target.value],
      });
      return;
    }

    props.setFromValue({
      name: e.target.value,
      value: '',
    });
  };

  // Handler for displaying the result
  const handleTo = (e) => {
    props.setCurrentCourse(e);

    //Display currency icon
    if (Object.keys(props.CURRENCY_TABLE).includes(e.target.value)) {
      props.setToValue({
        name: e.target.value,
        value: props.CURRENCY_TABLE[e.target.value],
      });

      return;
    }

    props.setToValue({
      name: e.target.value,
      value: '',
    });
  };


  return (
    <div className='screen'>
      <ScreenLine
        className='screen-line__one'
        currency={props.from.value}
        handleSelect={handleFrom}
        defaultValue={props.from.name}
        currentNumber={splittingNumber(props.currentNumber)}
        options={options}
        fontSize={props.fontSizeOne}
      />
      <ScreenLine
        className='screen-line__two'
        currency={props.to.value}
        handleSelect={handleTo}
        defaultValue={props.to.name}
        currentNumber={splittingNumber(props.resultNumber)}
        options={options}
        fontSize={props.fontSizeTwo}
      />
    </div>
  )
}

ScreenOther.propTypes = {
  currencyList: PropTypes.array,
  to: PropTypes.object,
  from: PropTypes.object,
  CURRENCY_TABLE: PropTypes.object,
  resultNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSizeOne: PropTypes.number,
  fontSizeTwo: PropTypes.number,
  setCurrentCourse: PropTypes.func,
  handleBasicCurrency: PropTypes.func,
  setFromValue: PropTypes.func,
  setToValue: PropTypes.func,
};

ScreenOther.defaultProp = {
  currencyList: [],
  to: { name: '', value: '' },
  from: { name: '', value: '' },
  CURRENCY_TABLE: {},
  resultNumber: '0',
  currentNumber: '0',
  fontSizeOne: 88,
  fontSizeTwo: 88,
  setCurrentCourse: () => console.log('Не определена функци setCurrentCourse'),
  handleBasicCurrency: () => console.log('Не определена функция handleBasicCurrency'),
  setFromValue: () => console.log('Не определена функция setFromValue'),
  setToValue: () => console.log('Не определена функция setToValue'),
};

export default ScreenOther;