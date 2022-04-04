import React, { useEffect, useState } from 'react';

import './ModalInfo.scss';
import convertationService from '../../../services/convertationService';
import ModalInfo from './ModalInfo';

const ModalInfoContainer = ({ servicesUrl, statusServices, onSetStatusServices, setFetching, isFetching }) => {
  const [isShow, setIsShow] = useState(false);

  const onClick = () => {
    if (!isShow) {
      setFetching(true);
      convertationService.getStatusApi().then(result => onSetStatusServices(result));
    }
    setIsShow(!isShow);
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