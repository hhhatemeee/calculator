import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import AllServiceLimit from './AllServiceLimit';
import ServiceLimit from './ServiceLimit';

import './ModalWindow.scss';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';

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
  }, []);

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
    <ModalWindowWrapper
      title={props.listLimit.length >= 3 ? 'Достигнут лимит запров' : 'Лимит запросов у сервиса'}
      boolean={props.showWindow}
      onClick={handleCloseWindow}>
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
    </ModalWindowWrapper >
  )
}

ModalWindow.propTypes = {
  listLimit: PropTypes.array,
  url: PropTypes.string,
  showWindow: PropTypes.bool,
  onClick: PropTypes.func,
  switchService: PropTypes.func,
};

ModalWindow.defaultProps = {
  listLimit: [],
  url: '',
  showWindow: false,
  onClick: () => console.log('Не указана функция onClick'),
  switchService: () => console.log('Не указана функция switchService'),
};

export default ModalWindow;