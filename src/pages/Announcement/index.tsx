import assert from 'assert';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaClock, FaInfoCircle, FaMapMarkerAlt, FaRegKiss, FaSuitcase } from "react-icons/fa";
import { useHistory } from 'react-router';
import Alert from "../../component/Alert";
import Pagination from '../../component/Pagination';

interface Qualification {
  name: string;
  type: string;
}

const listContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  maxWidth: "900px",
  margin: "auto",
  padding: "40px 0",
};

const cardStyle: React.CSSProperties = {
  maxWidth: "720px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "40px",
  background: "#fffff",
  border: "1px solid #E5E5E5",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "15px",
  marginBottom: "40px",
};

const companyNameStyle: React.CSSProperties = {
  fontSize: "30px",
  marginRight: "10px",
};

const positionStyle: React.CSSProperties = {
  fontSize: "14px",
};

const informationStyle: React.CSSProperties = {
  color: "#9e9ea7",
  fontSize: "14px",
};

const informationItemStyle: React.CSSProperties = {
  marginRight: "20px",
};

const buttonContainerStyle: React.CSSProperties = {
  textAlign: "right",
  width: "100%",
};

const qualificationListStyle: React.CSSProperties = {
  margin: "25px 0px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  padding: "0px",
  fontSize: "14px",
};

const emptyQualificationStyle: React.CSSProperties = {
  color: "#9e9ea7",
};

const qualificationStyle: React.CSSProperties = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  justifyItems: "center",
  alignContent: "flex-start",
  background: "#e5e5e5",
  borderRadius: "15px",
  margin: "10px",
};

const typeStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#9e9ea7",
  textAlign: "right",
};

const buttonStyle: React.CSSProperties = {
  marginLeft: "10px",
}

const deleteAnnouncement = (id: number): Promise<void> => {
  return fetch(`/api/announcement/${id}`, {method: "delete"})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error occurred in post announcement");
    });
};

const Announcement: React.FC = () => {
  const history = useHistory();
  const [isFetching, setFetching] = useState<boolean>(true);
  const [isToastVisible, setToastVisible] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>();

  const renderSpinner = () => {        
    return <div style={{textAlign: "center"}}><Spinner animation="border" variant="info" /></div>;
  };

  const renderAnnouncements = () => {
    if (announcements.length === 0) {
        return <p style={{textAlign: "center"}}>입력된 공고가 없어요!</p>;
    }
    return announcements.map(renderAnnouncement);
  };

  const renderAnnouncement = (announcement: Announcement, index?: number) => {
    return (
      <div style={cardStyle} key={index}>
        <div>
          <span style={companyNameStyle}>{announcement.company.companyName}</span>
          <span style={positionStyle}>{announcement.position.positionName}</span>
        </div>
        <div style={informationStyle}>
          <span style={informationItemStyle}><FaMapMarkerAlt /> {announcement.districtName}</span>
          <span style={informationItemStyle}><FaSuitcase /> {announcement.workingType}</span>
          <span style={informationItemStyle}><FaInfoCircle/> {announcement.recruitType}</span>
          <span style={informationItemStyle}><FaClock/> {announcement.receiptTimestamp} 까지</span>
        </div>
        <div style={qualificationListStyle}>
          {renderQualifications(getQualifications(announcement))}
        </div>
        <div style={buttonContainerStyle}>
          <Button variant="danger" style={buttonStyle} onClick={() => handleDelete(announcement.id)}>삭제</Button>
          <Button variant="info" style={buttonStyle} onClick={() => history.push(`/announcement/${announcement.id}`)}>수정</Button>
        </div>
      </div>
    );
  };

  const handleDelete = (id: number) => {
    deleteAnnouncement(id)
      .then(() => setAnnouncements(announcements.filter(value => value.id !== id)))
      .then(alert)
      .catch(console.log);
  };

  const alert = (): void => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1000);
  };

  const getQualifications = (announcement: Announcement): Qualification[] => {
    const qualifications: Qualification[] = [];
    qualifications.push(...announcement.subjects.map(value => ({name: value.subjectName, type: "과목"})));
    qualifications.push(...announcement.languageScores.map(value => ({name: value.languageName, type: "어학점수"})));
    qualifications.push(...announcement.departments.map(value => ({name: value, type: "학과"})));
    qualifications.push(...announcement.certificates.map(value => ({name: value, type: "자격증"})));
    return qualifications;
  };

  const renderQualifications = (qualifications: Qualification[]) => {
    if (qualifications.length === 0) {
      return <span style={emptyQualificationStyle}>아무 자격요건도 보지 않아요 <FaRegKiss /></span>;
    }
    return qualifications.map((value, index) => renderQualification(value, index));
  };

  const renderQualification = (qualification: Qualification, index: number) => {
    return (        
      <div style={qualificationStyle} key={index}>
        <span>{qualification.name}</span>
        <span style={typeStyle}>{qualification.type}</span>
      </div>
    );
  };

  const renderAnnouncementAndPagination = () => {
    return (
      <div style={listContainerStyle}>
        <div id="announcement-list-container">
          {renderAnnouncements()}
        </div>
        <div id="pagination-container">
          {renderPagination()}
        </div>
      </div>
    );
  };

  const renderPagination = () => {
    if (announcements.length === 0) {
      return;
    }
    assert(totalPage !== undefined);
    return (
      <Pagination
        currentPage={page}
        totalPage={totalPage}
        onPageChange={setPage}
      />
    );
  };

  const handleAnnouncementFetch = (data: any) => {
    setTotalPage(data.totalPages);
    setAnnouncements(data.content);
  };

  useEffect(() => {
    fetch(`/api/announcement?page=${page}`)
      .then(response => response.json())
      .then(handleAnnouncementFetch)
      .then(() => setFetching(false));
  }, [page]);

  return (
    <>
      <Alert show={isToastVisible} title="정상적으로 삭제되었습니다!" />
      {isFetching ? renderSpinner() : renderAnnouncementAndPagination()}
    </>
  );
};
 
export default Announcement;