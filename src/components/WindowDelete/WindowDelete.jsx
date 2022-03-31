import React from 'react';

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

const ButtonConfirm = ({ onClick }) => <div onClick={onClick} className='window__button-confirm'>
  Yes
</div>



export default WindowDelete;