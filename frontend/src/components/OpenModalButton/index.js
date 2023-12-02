import React from 'react';
import { useModal } from '../../context/Modal/Modal';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  propagateClick = true
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    if (!propagateClick) {
      e.stopPropagation();
    }

    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent());
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
