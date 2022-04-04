import React from 'react';
import ButtonConfirm from '../../subComponents/ButtonConfirm/ButtonConfirm';

import ModalWindowWrapper from '../ModalWindowWrapper/ModalWindowWrapper';

import './WindowDelete.scss';

const WindowDelete = ({ onClick, boolean, handleBoolean }) => {
  return (
    <ModalWindowWrapper
      title='Confirmation'
      hide={true}
      boolean={boolean}
      buttonText='Cancel'
      button={<ButtonConfirm onClick={onClick} />}
      isInlineButtons={true}
      onClick={handleBoolean}
    >
      <p className='window__content-text'>Do you want to delete a section?</p>
    </ModalWindowWrapper>
  )
}

export default WindowDelete;