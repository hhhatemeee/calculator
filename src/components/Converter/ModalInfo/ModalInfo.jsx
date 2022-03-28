import React, { useState } from 'react';
import cn from 'classnames';


import './ModalInfo.scss';

const ModalInfo = ({ servicesStatus, servicesUrl }) => {
  const [isShow, setIsShow] = useState(false);
  const onClick = () => setIsShow(!isShow);

  return (
    <div className='modal-info'>
      <div className='modal-info__logo'>
        <i className='ico-Info' onClick={onClick} />
      </div>
      <div className={cn('modal-info__container', { isOpen: isShow })}>
        <div className='modal-info__header'>STATUS API</div>
        {
          Object.keys(servicesStatus).length === 3 && Object.keys(servicesStatus).map((service) => {
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