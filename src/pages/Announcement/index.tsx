import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaClock, FaInfoCircle, FaMapMarkerAlt, FaRegKiss, FaSuitcase } from "react-icons/fa";
import { useHistory } from 'react-router';

interface Qualification {
  name: string;
  type: string;
}

const listContainerStyle: React.CSSProperties = {
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
  textAlign: "center",
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

const Announcement: React.FC = () => {
  const history = useHistory();
  const [isFetching, setFetching] = useState<boolean>(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

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
          <Button variant="info" onClick={() => history.push(`/announcement/${announcement.id}`)}>수정</Button>
        </div>
      </div>
    );
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

  useEffect(() => {
    fetch("/api/announcement")
      .then(response => response.json())
      .then(data => setAnnouncements(data.content))
      .then(() => setFetching(false));
  }, []);
 
  return (
    <div id="announcement-list-container" style={listContainerStyle}>
      {isFetching ? renderSpinner() : renderAnnouncements()}
    </div>
  );
};
 
export default Announcement;