import React from 'react';
import PropTypes from 'prop-types';

import CustomButton from '../../subComponents/CustomButton/CustomButton';
import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';

import './WindowDelete.scss';

const WindowDelete = ({ onClick, boolean, handleBoolean }) => {
  return (
    <ModalWindowWrapper
      title='Confirmation'
      hide={true}
      boolean={boolean}
      buttonText='Cancel'
      button={<CustomButton type='confirm' text='Yes' onClick={onClick} />}
      isInlineButtons={true}
      onClick={handleBoolean}
    >
      <p className='window__content-text'>Do you want to delete a section?</p>
    </ModalWindowWrapper>
  )
}

WindowDelete.propTypes = {
  onClick: PropTypes.func,
  boolean: PropTypes.bool,
  handleBoolean: PropTypes.func,
}

WindowDelete.defaultProps = {
  boolean: false,
  onClick: () => console.log('Не определена функция onClick'),
  handleBoolean: () => console.log('Не определена функция handleBoolean'),
}

export default WindowDelete;