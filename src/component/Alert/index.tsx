import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

interface Props {
  show: boolean
  title: string
  variant?: string
}

const Alert = (props: Props) => {
  return (
    <BootstrapAlert
      variant={props.variant ? props.variant : "success"}
      show={props.show} 
      style={{position: "fixed", top: 15, right: 15, zIndex: 999}}
    >
      {props.title}
    </BootstrapAlert>
  );
};

export default Alert;