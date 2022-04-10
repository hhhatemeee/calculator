import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AllServiceLimit from './AllServiceLimit';
import ServiceLimit from './ServiceLimit';

import './ModalWindow.scss';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';
import convertationService from '../../services/convertationService';

const ModalWindow = (props) => {
  const SERVICE_LIST = ['CC', 'OE', 'FCA'];
  const [showInfo, setShowInfo] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  useEffect(() => {
    props.onClick(false);
  }, []);

  useEffect(() => {
    props.onClick(false);
  }, []);

  const handleClick = () => setShowInfo(!showInfo);
  const handleShowUrl = () => setShowUrl(!showUrl);

  const handleCloseWindow = () => {
    props.onClick(false);
    setShowUrl(false);
  }

  const switchService = (e) => {
    convertationService.switchService(e.target.innerText);
    props.setCurrentService(e.target.innerText);
    props.onClick(false);
    setShowUrl(false);
  }

  return (
    <ModalWindowWrapper
      title={props.listLimit.length === 3 ? 'Достигнут лимит запров' : 'Лимит запросов у сервиса'}
      boolean={props.showWindow}
      hide={true}
      onClick={handleCloseWindow}>
      {
        props.listLimit.length === 3
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
  setCurrentService: PropTypes.func,
};

ModalWindow.defaultProps = {
  listLimit: [],
  url: '',
  showWindow: false,
  onClick: () => console.log('Не указана функция onClick'),
  setCurrentService: () => console.log('Не указана функция setCurrentService'),
};

export default ModalWindow;