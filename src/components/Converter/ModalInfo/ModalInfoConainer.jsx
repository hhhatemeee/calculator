import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import convertationService from '../../../services/convertationService';
import ModalInfo from './ModalInfo';

import './ModalInfo.scss';


const ModalInfoContainer = ({ onSetIsShow, isShow, servicesUrl, statusServices, onSetStatusServices, setFetching, isFetching }) => {

  const onClick = () => {
    if (!isShow && statusServices.length !== 3) {
      setFetching(true);
    }
    onSetIsShow(!isShow);
  };

  useEffect(() => {
    convertationService.getStatusApi().then(result => onSetStatusServices(result));
  }, [])

  useEffect(() => {
    if (statusServices && statusServices.length === 3) {
      setFetching(false);
    }
  }, [statusServices]);

  return (
    <ModalInfo
      servicesUrl={servicesUrl}
      isFetching={isFetching}
      onClick={onClick}
      isShow={isShow}
      statusServices={statusServices}
    />
  )
}

ModalInfoContainer.propTypes = {
  statusServices: PropTypes.arrayOf(PropTypes.object).isRequired,
  servicesUrl: PropTypes.object,
  isFetching: PropTypes.bool,
  isShow: PropTypes.bool,
  setFetching: PropTypes.func,
  onSetStatusServices: PropTypes.func,
  onSetIsShow: PropTypes.func,
};

ModalInfoContainer.defaultProps = {
  isFetching: false,
  isShow: false,
  statusServices: {},
  setFetching: () => console.log('Не определена setFetching'),
  onSetStatusServices: () => console.log('Не определена onSetStatusServices'),
  onSetIsShow: () => console.log('Не определена onSetIsShow'),
};

export default ModalInfoContainer;