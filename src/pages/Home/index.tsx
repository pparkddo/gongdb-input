import React, { useState } from 'react';
import Alert from '../../component/Alert';
import AnnouncementInputForm from '../../component/AnnouncementInputForm';
import FixedButton from '../../component/FixedButton';

const Home: React.FC = () => {
  const [isToastVisible, setToastVisible] = useState<boolean>(false);
  const [recentAnnouncement, setRecentAnnouncement] = useState<Announcement>();

  const alert = (): void => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1000);
  };

  const post = (announcement: AnnouncementInput): Promise<void> => {
    return fetch("/api/announcement", {
      method: "post",
      body: JSON.stringify(announcement),
      headers: {"Content-Type": "application/json;charset=utf8"}
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error occurred in post announcement");
    });
  };

  const submit = (announcement: AnnouncementInput): void => {
    post(announcement).then(alert).catch(console.log);
  };

  const getRecentAnnouncement = (): void => {
    fetch("/api/announcement/recent").then(response => response.json()).then(setRecentAnnouncement);
  };

  return (
     <>
      <Alert show={isToastVisible} title="정상적으로 입력되었습니다!" />
      <AnnouncementInputForm announcement={recentAnnouncement} onSubmit={submit} />
      <FixedButton onClick={getRecentAnnouncement} onDoubleClick={() => {}} />
    </>
  );
};

export default Home;