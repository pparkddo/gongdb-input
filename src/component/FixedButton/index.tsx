import React, { useState } from 'react';
import { IoMdCopy } from "react-icons/io";
import Alert from '../Alert';

interface FixedButtonProps {
  onClick: () => void;
  onDoubleClick: () => void;
  alertTitle?: string; 
}

const buttonStyle: React.CSSProperties = {
  position: "fixed", 
  width: 50, 
  height: 50, 
  bottom: 20, 
  right: 20, 
  backgroundColor: "#a9e1fa", 
  borderRadius: 50, 
  boxShadow: "0 6px 10px 0 #666", 
  transition: "all 0.1s ease-in-out",
  textAlign: "center"
};

const FixedButton = (props: FixedButtonProps) => {
  const [toastShow, setToastShow] = useState<boolean>(false);

  const alert = () => {
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 1000);
  };

  return (
    <>
      <Alert show={toastShow} title={props.alertTitle ? props.alertTitle : "정상적으로 복사되었습니다!"} />
      <div 
        style={buttonStyle}
        onClick={() => {
          props.onClick();
          alert();
        }}
        onDoubleClick={() => {
          props.onDoubleClick();
          alert();
        }}
      >
        <IoMdCopy size={28} style={{height: 50}} />
      </div>
    </>
  );
};

export default FixedButton;