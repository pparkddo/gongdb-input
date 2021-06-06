import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form as BootstrapForm, InputGroup, Row } from "react-bootstrap";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import FormDivider from "../FormDivider";
import PillCheckbox from "../PillCheckbox";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./AnnouncementInputForm.css";

interface AnnouncementInputFormProps {
  onSubmit: () => void;
}

interface Certificate {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

const formStyle = {
  maxWidth: "500px",
  margin: "auto",
  padding: "40px 0",
};

const ncs = [
  "의사소통능력",
  "문제해결능력",
  "대인관계능력",
  "자원관리능력",
  "직업윤리",
  "정보능력",
  "수리능력",
  "직무수행능력",
  "전공능력",
  "기술능력",
  "조직이해능력",
];

const AnnouncementInputForm: React.FC<AnnouncementInputFormProps> = props => {
  const [companyName, setCompanyName] = useState<string>("");
  const [sequence, setSequence] = useState<string>("");
  const [receiptTimestamp, setReceiptTimestamp] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [languageScores, setLanguageScores] = useState<LanguageScore[]>([{languageName: "", languageScore: "", languagePerfectScore: ""}]);
  const [workingType, setWorkingType] = useState<string>("");
  const [positionName, setPositionName] = useState<string>("");
  const [recruitLevel, setRecruitLevel] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [recruitType, setRecruitType] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([""]);
  const [certificateOptions, setCertificateOptions] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<string[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([""]);
  const recruitTypeElement = useRef<HTMLInputElement>(null);

  const focusOnFirst = (): void => {
    recruitTypeElement?.current?.focus();
  };

  const handleSubmit = (): void => {
    props.onSubmit();
    focusOnFirst();
  };

  const changeLanguageScore = (name: string, value: string, index: number): void => {
    const list = [...languageScores];
    list[index][name] = value;
    setLanguageScores(list);
  };

  const removeLanguageScore = (index: number): void => {
    const list = [...languageScores];
    list.splice(index, 1);
    setLanguageScores(list);
  };

  const addLanguageScore = (): void => {
    setLanguageScores([...languageScores, {languageName: "", languageScore: "", languagePerfectScore: ""}]);
  };

  const changeSubject = (value: string, index: number): void => {
    const list = [...subjects];
    if (value === "" && list.length > 1) {
      list.splice(index, 1);
    } else {
      list[index] = value;
    }
    setSubjects(list);
  };

  const removeSubject = (index: number): void => {
    const list = [...subjects];
    list.splice(index, 1);
    setSubjects(list);
  };

  const changeNote = (value: string, index: number) => {
    const list = [...notes];
    if (value === "" && list.length > 1) {
      list.splice(index, 1);
    } else {
      list[index] = value;
    }
    setNotes(list);
  };

  const removeNote = (index: number): void => {
    const list = [...notes];
    list.splice(index, 1);
    setNotes(list);
  };

  const renderLanguageScores = (): JSX.Element[] => {
    return languageScores.map((languageScore, index) => (
      <Row style={{alignItems: "center", marginTop: index === 0 ? 0 : 10}} key={index}>
        <Col xs={6}>
          <BootstrapForm.Control
            name="languageName"
            value={languageScore.languageName}
            onChange={e => changeLanguageScore(e.target.name, e.target.value, index)}
            autoComplete="off"
          />
        </Col>
        <Col xs={3}>
          <BootstrapForm.Control
            name="languageScore"
            value={languageScore.languageScore}
            onChange={e => changeLanguageScore(e.target.name, e.target.value, index)}
            autoComplete="off"
          />
        </Col>
        <Col xs={3}>
          <InputGroup style={{alignItems: "center"}}>
            <BootstrapForm.Control
              name="languagePerfectScore"
              value={languageScore.languagePerfectScore}
              onChange={e => changeLanguageScore(e.target.name, e.target.value, index)}
              autoComplete="off"
              style={{borderRadius: "0.25rem"}}
            />
            <InputGroup.Append>
              <IoIosClose
                size={28}
                color="#777777"
                style={{marginLeft: 5}}
                onClick={() => removeLanguageScore(index)}
              />
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    ));
  };

  const renderSubjects = (): JSX.Element[] => {
    return subjects.map((subject, index) => (
      <Col xs={12} style={{marginTop: index === 0 ? 0 : 10}} key={index}>
        <InputGroup style={{alignItems: "center"}}>
          <BootstrapForm.Control
            name="subjects"
            value={subject}
            onChange={e => changeSubject(e.target.value, index)}
            autoComplete="off"
            style={{borderRadius: "0.25rem"}}
          />
          <InputGroup.Append>
            <IoIosClose
              size={28}
              color="#777777"
              style={{marginLeft: 5}}
              onClick={() => removeSubject(index)}
            />
          </InputGroup.Append>
        </InputGroup>
      </Col>
    ));
  };

  const renderNotes = (): JSX.Element[] => {
    return notes.map((note, index) => (
      <Col xs={12} style={{marginTop: index === 0 ? 0 : 10}} key={index}>
        <InputGroup style={{alignItems: "center"}}>
          <BootstrapForm.Control
            name="notes"
            value={note}
            onChange={e => changeNote(e.target.value, index)}
            autoComplete="off"
            style={{borderRadius: "0.25rem"}}
          />
          <InputGroup.Append>
            <IoIosClose
              size={28}
              color="#777777"
              style={{marginLeft: 5}}
              onClick={() => removeNote(index)}
            />
          </InputGroup.Append>
        </InputGroup>
      </Col>
    ));
  };
  
  useEffect(() => {
    fetch("/api/certificate")
      .then(response => response.json())
      .then((data: Certificate[]) => setCertificateOptions(data.map(value => value.name)));
    fetch("/api/department")
      .then(response => response.json())
      .then((data: Department[]) => setDepartmentOptions(data.map(value => value.name)));
  }, []);

  return (
    <div id="input-form" style={formStyle}>
      <BootstrapForm>
        <Row>
          <Col xs={12}>
            <FormDivider title="일반정보" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>회사명</BootstrapForm.Label>
            <BootstrapForm.Control
              name="companyName"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <BootstrapForm.Label>차수</BootstrapForm.Label>
            <BootstrapForm.Control
              name="sequence"
              value={sequence}
              onChange={e => setSequence(e.target.value)}
              autoComplete="off"
            />
          </Col>
          <Col xs={6}>
            <BootstrapForm.Label>접수일자</BootstrapForm.Label>
            <BootstrapForm.Control
              type="date"
              name="receiptTimestamp"
              value={receiptTimestamp}
              onChange={e => setReceiptTimestamp(e.target.value)}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>공고링크</BootstrapForm.Label>
            <BootstrapForm.Control
              name="link"
              value={link}
              onChange={e => setLink(e.target.value)}
              autoComplete="off"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            <FormDivider title="어학정보" />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <BootstrapForm.Label>어학시험명</BootstrapForm.Label>
          </Col>
          <Col xs={3}>
            <BootstrapForm.Label>지원가능 어학성적</BootstrapForm.Label>
          </Col>
          <Col xs={3}>
            <BootstrapForm.Label>어학성적 만점기준</BootstrapForm.Label>
          </Col>
        </Row>
        { languageScores.length === 1
          ? <Row>
              <Col xs={6}>
                <BootstrapForm.Control
                  name="languageName"
                  value={languageScores[0].languageName}
                  onChange={e => changeLanguageScore(e.target.name, e.target.value, 0)}
                  autoComplete="off"
                />
              </Col>
              <Col xs={3}>
                <BootstrapForm.Control
                  name="languageScore"
                  value={languageScores[0].languageScore}
                  onChange={e => changeLanguageScore(e.target.name, e.target.value, 0)}
                  autoComplete="off"
                />
              </Col>
              <Col xs={3}>
                <BootstrapForm.Control
                  name="languagePerfectScore"
                  value={languageScores[0].languagePerfectScore}
                  onChange={e => changeLanguageScore(e.target.name, e.target.value, 0)}
                  autoComplete="off"
                />
              </Col>
            </Row>
          : renderLanguageScores() }
        <Row>
          <Col xs={12} className="text-center">
            <Button
              variant="outline-info"
              className="mt-3"
              onClick={addLanguageScore}
            >
              <IoIosAdd />
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            <FormDivider title="채용정보" />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <BootstrapForm.Label>근무형태</BootstrapForm.Label>
            <BootstrapForm.Control
              name="workingType"
              value={workingType}
              onChange={e => setWorkingType(e.target.value)}
              autoComplete="off"
            />
          </Col>
          <Col xs={6}>
            <BootstrapForm.Label>직군</BootstrapForm.Label>
            <BootstrapForm.Control
              name="positionName"
              value={positionName}
              onChange={e => setPositionName(e.target.value)}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <BootstrapForm.Label>채용수준</BootstrapForm.Label>
            <BootstrapForm.Control
              name="recruitLevel"
              value={recruitLevel}
              onChange={e => setRecruitLevel(e.target.value)}
              autoComplete="off"
            />
          </Col>
          <Col xs={6}>
            <BootstrapForm.Label>직급</BootstrapForm.Label>
            <BootstrapForm.Control
              name="rank"
              value={rank}
              onChange={e => setRank(e.target.value)}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>채용구분</BootstrapForm.Label>
            <BootstrapForm.Control
              name="recruitType"
              value={recruitType}
              onChange={e => setRecruitType(e.target.value)}
              autoComplete="off"
              ref={recruitTypeElement}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>지역</BootstrapForm.Label>
            <BootstrapForm.Control
              name="districtName"
              value={districtName}
              onChange={e => setDistrictName(e.target.value)}
              autoComplete="off"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            <FormDivider title="채용상세" />
          </Col>
        </Row>           
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>과목</BootstrapForm.Label>
          </Col>
          { subjects.length === 1
            ? <Col xs={12}>
                <BootstrapForm.Control
                  name="subject"
                  value={subjects[0]}
                  onChange={e => changeSubject(e.target.value, 0)}
                  autoComplete="off"
                />
              </Col>
            : renderSubjects() }
          <Col xs={12} className="text-center">
            <Button
              variant="outline-info"
              className="mt-3"
              onClick={() => setSubjects([...subjects, ""])}
            >
              <IoIosAdd />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="my-4 text-center">
            <BootstrapForm.Label style={{display: "block", textAlign: "left"}}>NCS 과목</BootstrapForm.Label>
            {
              ncs.map((value, index) => (
                <PillCheckbox 
                  name="ncs"
                  label={value}
                  key={index}
                />
              ))
            }
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>지원가능 자격증</BootstrapForm.Label>
            <Typeahead
              id="certificates"
              multiple
              allowNew
              minLength={1}
              onChange={setCertificates}
              selected={certificates}
              options={certificateOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>지원가능 학과</BootstrapForm.Label>
            <Typeahead
              id="departments"
              multiple
              allowNew
              minLength={1}
              onChange={setDepartments}
              selected={departments}
              options={departmentOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>기타사항</BootstrapForm.Label>
          </Col>
          { notes.length === 1
            ? <Col xs={12}>
                <BootstrapForm.Control
                  name="notes"
                  value={notes[0]}
                  onChange={e => changeNote(e.target.value, 0)}
                  autoComplete="off"
                />
              </Col>
            : renderNotes() }
          <Col xs={12} className="text-center">
            <Button
              variant="outline-info"
              className="mt-3"
              onClick={() => setNotes([...notes, ""])}
            >
              <IoIosAdd />
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xs={12}>
            <Button 
              block
              variant="info" 
              onClick={handleSubmit}
            >
              입력
            </Button>
          </Col>
        </Row>
      </BootstrapForm>
    </div>
  );
};

export default AnnouncementInputForm;