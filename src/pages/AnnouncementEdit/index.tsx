import assert from "assert";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import Alert from '../../component/Alert';
import AnnouncementInputForm from "../../component/AnnouncementInputForm";

interface AnnouncementEditProps {
  id: string;
}

const put = (id: number, announcement: AnnouncementInput): Promise<void> => {
  return fetch(`/api/announcement/${id}`, {
    method: "put",
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

const AnnouncementEdit: React.FC<RouteComponentProps<AnnouncementEditProps>> = props => {
  const params = props.match.params;
  const [isToastVisible, setToastVisible] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [announcement, setAnnouncement] = useState<Announcement>();

  const alert = (): void => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1000);
  };

  const submit = (id: number, announcementInput: AnnouncementInput): void => {
    put(id, announcementInput).then(alert).catch(console.log);
  };

  const renderSpinner = () => {        
    return <div style={{textAlign: "center"}}><Spinner animation="border" variant="info" /></div>;
  };

  const renderAnnouncementInputForm = (announcement?: Announcement) => {
    assert(typeof announcement !== undefined);
    const id = (announcement as Announcement).id;
    return (
      <AnnouncementInputForm 
        announcement={announcement}
        onSubmit={announcementInput => submit(id, announcementInput)}
      />
    );
  };

  useEffect(() => {
    fetch(`/api/announcement/${params.id}`)
      .then(response => response.json())
      .then(setAnnouncement)
      .then(() => setFetching(false));
  }, [params]);

  return (
    <>
      <Alert show={isToastVisible} title="정상적으로 수정되었습니다!" />
      {isFetching ? renderSpinner() : renderAnnouncementInputForm(announcement)}
    </>
  );
};

export default AnnouncementEdit;