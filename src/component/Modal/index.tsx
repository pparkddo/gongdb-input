import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

interface Props {
  show: boolean 
  onHideButtonClick: () => void
  onActionButtonClick: () => void
  title: string
  body: string
  actionButtonName: string
  actionButtonVariant?: string
}

const Modal = (props: Props) => {
  return (
    <BootstrapModal show={props.show} onHide={props.onHideButtonClick} animation={false}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{props.title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{props.body}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="light" onClick={props.onHideButtonClick}>취소</Button>
        <Button variant={props.actionButtonVariant ? props.actionButtonVariant : "primary"} onClick={props.onActionButtonClick}>{props.actionButtonName}</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;