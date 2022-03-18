import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../Select/Select';

const ConverterSwitch = (props) => {
  return (
    <span className='converter__switch'>
      <p>Switch Service:</p>
      {props.listLimit.length >= 2
        ? <p className='convertner__current-service'>{props.currentService}</p>
        : <Select
          defaultValue={props.currentService}
          onChange={props.onChange}
          options={props.options} />
      }
    </span>
  )
}

ConverterSwitch.propTypes = {
  listLimit: PropTypes.array,
  currentService: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

ConverterSwitch.defaultProp = {
  listLimit: [],
  currentService: 'CC',
  onChange: () => console.log('Не определена функция onChange'),
  options: [{ name: 'CC', value: 'CC' }],
};
export default ConverterSwitch