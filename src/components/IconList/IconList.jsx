import React from 'react';
import cn from 'classnames';

import { ICO_NAMES } from '../../variables';

import './IconList.scss';


const IconList = ({ setIcon, currentImgName }) => {
  return (
    <div className='item__selector-icons'>
      {
        ICO_NAMES.map((name) => <div
          key={name}
          className={cn('icon__container', { 'icon_current': currentImgName === name })}>
          <i
            className={cn(`ico-${name} icon`)}
            onClick={() => setIcon(name)}
          />
        </div>
        )
      }
    </div>
  )
}

export default IconList;
