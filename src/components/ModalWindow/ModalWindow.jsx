import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AllServiceLimit from './AllServiceLimit';
import ServiceLimit from './ServiceLimit';

import './ModalWindow.scss';

const ModalWindow = (props) => {
  const SERVICE_LIST = ['CC', 'OE', 'FCA'];
  const [showInfo, setShowInfo] = useState(false);
  const [showUrl, setShowUrl] = useState(false);

  const handleClick = () => setShowInfo(!showInfo);

  const handleCloseWindow = () => {
    props.onClick(false);
    setShowUrl(false);
  }

  useEffect(() => {
    props.onClick(false);
  }, [])

  useEffect(() => {
    props.onClick(false);
  }, [])

  const handleShowUrl = () => setShowUrl(!showUrl);

  const switchService = (e) => {
    props.switchService(e.target.innerText);
    props.onClick(false);
    setShowUrl(false);
  }

  return (
    <div className={cn('window-overlay', { 'open-window': props.showWindow })}>
      <div className={cn('window-limit', { 'open-window': props.showWindow })}>
        <div className='window-limit__header'>
          <h4 className='window-limit__title'>
            {props.listLimit.length >= 3 ? 'Достигнут лимит запров' : 'Лимит запросов у сервиса'}
          </h4>
          <span onClick={handleCloseWindow}>+</span>
        </div>
        {
          props.listLimit.length >= 3
            ? <AllServiceLimit
              showInfo={showInfo}
              handleClick={handleClick}
              SERVICE_LIST={SERVICE_LIST} />
            : <ServiceLimit
              handleShowUrl={handleShowUrl}
              showUrl={showUrl}
              SERVICE_LIST={SERVICE_LIST}
              switchService={switchService}
              listLimit={props.listLimit}
              url={props.url}
            />
        }
        <div className='window-limit__button-line'>
          <button className='window-limit__button' onClick={handleCloseWindow}>OK</button>
        </div>
      </div>
    </div >
  )
}

ModalWindow.propTypes = {
  listLimit: PropTypes.array,
  url: PropTypes.string,
  showWindow: PropTypes.bool,
  onClick: PropTypes.func,
  switchService: PropTypes.func,
};

ModalWindow.defaultProp = {
  listLimit: [],
  url: '',
  showWindow: false,
  onClick: () => console.log('Не указана функция onClick'),
  switchService: () => console.log('Не указана функция switchService'),
};

export default ModalWindow;