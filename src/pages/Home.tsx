import React, { useState } from 'react';
import Alert from '../component/Alert';
import AnnouncementInputForm from '../component/AnnouncementInputForm';
import FixedButton from '../component/FixedButton';

const Home: React.FC = () => {
  const [isToastVisible, setToastVisible] = useState<boolean>(false);

  const alert = (): void => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1000);
  };

  return (
     <>
      <Alert show={isToastVisible} title="정상적으로 입력되었습니다!" />
      <AnnouncementInputForm onSubmit={alert}/>
      <FixedButton 
        onClick={() => console.log("gongdbInputData.length ? loadDataToForm(gongdbInputData.slice(-1)[0]) : {}")}
        onDoubleClick={() => {}}
      />
    </>
  );
}

export default Home;