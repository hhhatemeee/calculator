import React, { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as LogoInfo } from '../../../img/Info.svg';

import './ModalInfo.scss';

const ModalInfo = ({ servicesStatus, servicesUrl }) => {
  const [isShow, setIsShow] = useState(false);
  const onClick = () => setIsShow(!isShow);

  return (
    <div className='modal-info'>
      <div className='modal-info__logo'>
        <LogoInfo onClick={onClick} />
      </div>
      <div className={cn(('modal-info__container'), { isOpen: isShow })}>
        <div className='modal-info__header'>STATUS API</div>
        {
          Object.keys(servicesStatus).map((service) => {
            return <a
              className={cn(('modal-info__status-list'), { isOpen: isShow })} key={service}
              href={`https://${servicesUrl[service]}`}>
              <span>{service}</span>
              <div className={cn('modal-info__status-api', { isDown: !servicesStatus[service] })} />
            </a>
          })
        }
      </div>
    </div >
  )
}

export default ModalInfo