import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { ICO_NAMES } from '../../variables';

import './IconList.scss';


const IconList = ({ setIcon, currentImgName }) => {
  console.log(currentImgName);
  return (
    <div className='item__selector-icons'>
      {
        ICO_NAMES.map((name) => {
          console.log(currentImgName === name);
          return <div
            key={name}
            className={cn('icon__container', { 'current--icon': currentImgName === name })}>
            <i
              className={cn(`ico-${name} icon`)}
              onClick={() => setIcon(name)}
            />
          </div>
        })
      }
    </div>
  )
}

export default IconList;
