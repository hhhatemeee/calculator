import React from 'react';

import ScreenOther from '../ScreenOther/ScreenOther';

import './Converter.scss';

const Converter = (props) => {
  return (
    <div className='converter__container'>
      <ScreenOther currencyList={props.currencyList} currency={'USD'} />
    </div>
  )
}

export default Converter;