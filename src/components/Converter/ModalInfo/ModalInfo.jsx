import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { ReactComponent as Loader } from '../../../img/Loader.svg';
import './ModalInfo.scss';

const ModalInfo = ({ servicesUrl, statusServices, onClick, isShow, isFetching }) => {
  return (
    <div className='modal-info'>
      <div className='modal-info__logo'>
        <i className='ico-Info' onClick={onClick} />
      </div>
      <div className={cn('modal-info__container', { isOpen: isShow })}>
        <div className='modal-info__header'>STATUS API</div>
        {

          isFetching && isShow ? <Loader className='modal-info__loader' />
            : statusServices && statusServices.map((service) => {
              const key = Object.keys(service);
              return <a
                className={cn(('modal-info__status-list'), { isOpen: isShow })} key={key}
                href={`https://${servicesUrl[key]}`}
                target="_blank">
                <span>{key}</span>
                <div className={cn('modal-info__status-api', { isDown: !service[key] })} />
              </a>
            })
        }
      </div>
    </div >
  )
}

export default ModalInfo