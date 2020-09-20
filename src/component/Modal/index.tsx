import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

interface Props {
  show: boolean 
  clickedIndex: number
  onHideButtonClick: () => void
  onRemoveButtonClick: () => void
}

const Modal = (props: Props) => {
  return (
    <BootstrapModal show={props.show} onHide={props.onHideButtonClick} animation={false}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>데이터 삭제</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{(props.clickedIndex)+1}번 데이터를 삭제하시겠습니까</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="light" onClick={props.onHideButtonClick}>취소</Button>
        <Button variant="danger" onClick={props.onRemoveButtonClick}>삭제</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;