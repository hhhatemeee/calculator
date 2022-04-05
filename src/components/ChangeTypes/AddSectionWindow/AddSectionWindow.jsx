import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonConfirm from '../../../subComponents/ButtonConfirm/ButtonConfirm';
import InputCustom from '../../../subComponents/Input/Input';
import ModalWindowWrapper from '../../ModalWindowWrapper/ModalWindowWrapper';

import './AddSectionWindow.scss';

const AddSectionWindow = ({
  boolean,
  handleBoolean,
  onClickButton,
}) => {
  const [newSection, setNewSection] = useState('');

  const onChange = (e) => setNewSection(e.target.value);

  const onClick = () => {
    if (newSection.trim()) {
      onClickButton(newSection);
      setNewSection('');
    }
  }

  return (
    <ModalWindowWrapper
      title='Add section'
      hide={true}
      boolean={boolean}
      buttonText='Cancel'
      button={<ButtonConfirm onClick={onClick} />}
      isInlineButtons={true}
      onClick={handleBoolean}
    >
      <p className='window__content-text'>Enter the name of the new section:</p>
      <InputCustom
        className='window-add-section__input'
        placeHolder='Enter new name...'
        onChange={onChange}
        value={newSection}
      />
    </ModalWindowWrapper>
  )
}


AddSectionWindow.propTypes = {
  boolean: PropTypes.bool,
  handleBoolean: PropTypes.func,
  onClickButton: PropTypes.func,
};

AddSectionWindow.defaultProps = {
  boolean: false,
  handleBoolean: () => console.log('Не определена функция handleBoolean'),
  onClickButton: () => console.log('Не определена функция onClickButton'),
};

export default AddSectionWindow;