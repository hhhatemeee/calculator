import React from 'react';

import { ReactComponent as HomeIcon } from '../../img/HomePage.svg'

import './HomePage.scss';

const HomePage = ({ setCurrentType }) => {

  const onClick = () => setCurrentType({ name: 'Standart' });

  return (
    <div className='calc-homepage'>
      <div>
        <HomeIcon />
      </div>
      <div className='calc-homepage__info'>
        <h3>Calculator in development</h3>
        <p>This calculator is under development, choose a different type.</p>
      </div>
      <div onClick={onClick} className='calc-homepage__button'>Switch to Standard</div>
    </div >
  )
}

export default HomePage;