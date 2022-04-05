import React, { useEffect, useState } from 'react';

import './ModalInfo.scss';
import convertationService from '../../../services/convertationService';
import ModalInfo from './ModalInfo';

const ModalInfoContainer = ({ onSetIsShow, isShow, servicesUrl, statusServices, onSetStatusServices, setFetching, isFetching }) => {

  const onClick = () => {
    if (!isShow) {
      setFetching(true);
      convertationService.getStatusApi().then(result => onSetStatusServices(result));
    }
    onSetIsShow(!isShow);
  };

  useEffect(() => {
    if (statusServices && statusServices.length === 3) {
      setFetching(false);
    }
  }, [statusServices]);

  return (
    <ModalInfo servicesUrl={servicesUrl} isFetching={isFetching} onClick={onClick} isShow={isShow} statusServices={statusServices} />
  )
}

export default ModalInfoContainer;