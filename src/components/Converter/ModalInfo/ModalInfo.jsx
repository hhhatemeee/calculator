import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { ReactComponent as Loader } from '../../../img/Loader.svg';
import HoverWindow from '../../../subComponents/HoverWindow/HoverWindow';
import detectedDevice from '../../../helpers/detectDevice';

import './ModalInfo.scss';

let hover = false;
const ModalInfo = ({ servicesUrl, statusServices, onClick, isShow, isFetching }) => {
  const [showInfo, setShowInfo] = useState(false);
  const isMobile = detectedDevice();

  const handleMouseOver = () => {
    hover = true;
    setTimeout(() => {
      if (hover) {
        setShowInfo(true);
      }
    }, 500);
  }

  const handleMouseOut = () => {
    hover = false;
    setShowInfo(false);
  }

  return (
    <div className='modal-info'>
      <div className='modal-info__logo'>
        <i className='ico-Info' onClick={onClick} />
        <HoverWindow className={cn('modal-info__hover-window',
          {
            'modal-info__hover-window_show': showInfo,
            'modal-info__hover-window_mobile': isShow && isMobile && !isFetching,
          })}
          position='bottom'
        >
          <h5><span className='green'>Green</span> status - the server is working properly.</h5>
          <h5><span className='yellow'>Yellow </span> status - the conversion service does not work.</h5>
          <h5><span className='red'>Red </span> status - server is down.</h5>
        </HoverWindow>
      </div>
      <div className={cn('modal-info__container', { isOpen: isShow })}>
        <div className='modal-info__header' >
          STATUS API</div>
        {
          isFetching && isShow ? <Loader className='modal-info__loader' />
            : statusServices && statusServices.map((service) => {
              const key = Object.keys(service);

              return <a
                className={cn(('modal-info__status-list'), { isOpen: isShow })} key={key}
                href={`https://${servicesUrl[key]}`}
                target="_blank">
                <span>{key}</span>
                <div className={cn('modal-info__status-api', { isDown: !service[key], isPartial: service[key] === 'Unavailable' })}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                />
              </a>
            })
        }
      </div>
    </div >
  )
}

ModalInfo.propTypes = {
  statusServices: PropTypes.arrayOf(PropTypes.object).isRequired,
  servicesUrl: PropTypes.object,
  isFetching: PropTypes.bool,
  isShow: PropTypes.bool,
  onClick: PropTypes.func,
};

ModalInfo.defaultProps = {
  isFetching: false,
  isShow: false,
  statusServices: {},
  onClick: () => console.log('Не определена onClick'),
};


export default ModalInfo