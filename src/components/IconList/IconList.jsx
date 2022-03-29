import React, { useEffect } from 'react';
import cn from 'classnames';

import { ICO_NAMES } from '../../variables';

import './IconList.scss';


const IconList = ({ setIcon, currentItemIcon }) => {
  useEffect(() => { }, [currentItemIcon.imgName])

  return (
    <div className='item__selector-icons'>
      {
        ICO_NAMES.map((name) => <div
          key={name}
          className={cn('icon__container', { 'current--icon': currentItemIcon.imgName === name })}>
          <i
            className={cn(`ico-${name} icon`)}
            onClick={() => setIcon(name)}
          />
        </div>)
      }
    </div>
  )
}

export default IconList;