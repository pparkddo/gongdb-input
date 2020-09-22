import React, { useState } from 'react';
import { IoMdCopy } from "react-icons/io";
import Alert from '../Alert';

interface Props {
  onClick: () => void
}

const FixedButton = (props: Props) => {
  const [toastShow, setToastShow] = useState<boolean>(false);

  return (
    <>
    <Alert show={toastShow} title="가장 최근 행이 복사되었습니다!" />
      <div 
        style={{
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
        }}
        onClick={() => {
          props.onClick();
          setToastShow(true);
          setTimeout(() => {
            setToastShow(false);
          }, 1000);
        }}
      >
        <IoMdCopy size={28} style={{height: 50}} />
      </div>
    </>
  );
};

export default FixedButton;