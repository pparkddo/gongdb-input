import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

interface Props {
  show: boolean 
}

const Alert = (props: Props) => {
  return (
    <BootstrapAlert
      variant="success"
      show={props.show} 
      style={{position: "fixed", top: 15, right: 15}}
    >
      정상적으로 입력되었습니다!
    </BootstrapAlert>
  );
};

export default Alert;