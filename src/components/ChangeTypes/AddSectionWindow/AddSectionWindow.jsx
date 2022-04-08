import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InputCustom from '../../../subComponents/Input/Input';
import CustomButton from '../../../subComponents/CustomButton/CustomButton';
import ModalWindowWrapper from '../../ModalWindowWrapper/ModalWindowWrapper';

import './AddSectionWindow.scss';

const AddSectionWindow = ({
  boolean,
  handleBoolean,
  onClickButton,
}) => {
  const [newSection, setNewSection] = useState('');
  const [isError, setIsError] = useState(false);

  const closeWindow = () => {
    handleBoolean();
    setIsError(false);
  }

  useEffect(() => {
    if (newSection.length > 0) {
      setIsError(false);
    }
  }, [newSection]);

  const onChange = (e) => {
    setNewSection(e.target.value)
  };

  const onClick = () => {
    if (newSection.trim()) {
      onClickButton(newSection);
      setNewSection('');

      return;
    }
    setIsError(true);
  }

  return (
    <ModalWindowWrapper
      title='Add section'
      hide={true}
      boolean={boolean}
      buttonText='Cancel'
      button={<CustomButton text='Save' onClick={onClick} type='confirm' />}
      isInlineButtons={true}
      onClick={closeWindow}
    >
      <p className='window__content-text'>Enter the name of the new section:</p>
      <InputCustom
        className='window-add-section__input'
        placeHolder='Enter new name...'
        onChange={onChange}
        value={newSection}
        isError={isError}
        errorText={'The field cannot be empty'}
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