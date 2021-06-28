import React, { useState } from 'react';
import Alert from '../../component/Alert';
import AnnouncementInputForm from '../../component/AnnouncementInputForm';
import FixedButton from '../../component/FixedButton';

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
    throw response.json();
  });
};

const Home: React.FC = () => {
  const [isAlertVisible, setAlertVisible] = useState<boolean>(false);
  const [isErrorAlertVisible, setErrorAlertVisible] = useState<boolean>(false);
  const [recentAnnouncement, setRecentAnnouncement] = useState<Announcement>();
  const [error, setError] = useState<ErrorResponse>();

  const alert = (): void => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 1000);
  };

  const alertError = (): void => {
    setErrorAlertVisible(true);
    setTimeout(() => {
      setErrorAlertVisible(false);
    }, 1000);
  };

  const submit = (announcement: AnnouncementInput): void => {
    post(announcement)
      .then(() => {
        alert();
        setError(undefined);
      })
      .catch(errorPromise => errorPromise.then((error: ErrorResponse) => {
        alertError();
        setError(error);
      }));
  };

  const getRecentAnnouncement = (): void => {
    fetch("/api/announcement/recent").then(response => response.json()).then(setRecentAnnouncement);
  };

  return (
    <div>
      <Alert show={isAlertVisible} title="정상적으로 입력되었습니다!" />
      <Alert show={isErrorAlertVisible} variant="danger" title={error?.message || ""} />
      <AnnouncementInputForm
        announcement={recentAnnouncement}
        fieldErrors={error?.fieldErrors}
        onSubmit={submit}
      />
      <FixedButton onClick={getRecentAnnouncement} onDoubleClick={() => {}} />
    </div>
  );
};

export default Home;