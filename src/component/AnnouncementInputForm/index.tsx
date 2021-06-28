import React, { useEffect, useState } from "react";
import { Button, Col, Form as BootstrapForm, InputGroup, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import FormDivider from "../FormDivider";
import PillCheckbox from "../PillCheckbox";
import "./AnnouncementInputForm.css";
import assert from 'assert';

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
  const [languageScores, setLanguageScores] = useState<LanguageScoreInput[]>([{name: "", score: "", perfectScore: ""}]);
  const [workingType, setWorkingType] = useState<string>("");
  const [positionName, setPositionName] = useState<string>("");
  const [recruitLevel, setRecruitLevel] = useState<string>("");
  const [headCount, setHeadCount] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [recruitType, setRecruitType] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([""]);
  const [ncsSubjects, setNcsSubjects] = useState<string[]>([]);
  const [certificateOptions, setCertificateOptions] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<(string|Selected)[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<(string|Selected)[]>([]);
  const [notes, setNotes] = useState<string[]>([""]);

  const submit = (): void => {
    const announcement = getAnnouncement();
    props.onSubmit(announcement);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const getAnnouncement = (): AnnouncementInput => {
    return {
      "companyName": companyName,
      "positionName": positionName,
      "recruitType": recruitType,
      "recruitLevel": recruitLevel,
      "workingType": workingType,
      "districtName": districtName,
      "headCount": headCount,
      "certificates": getCertificates(),
      "departments": getDepartments(),
      "subjects": getEmptyStringRemovedSubjects(getMergedSubjects()),
      "languageScores": getEmptyStringRemovedLanguageScores(),
      "notes": getEmptyStringRemovedNotes(),
      "receiptTimestamp": receiptTimestamp,
      "sequence": sequence,
      "link": link,
      "rank": rank,
    };
  };

  const getEmptyStringRemovedNotes = () => {
    const lastNote = notes[notes.length-1];
    return lastNote ? notes : notes.slice(0, -1);
  };

  const getEmptyStringRemovedLanguageScores = () => {
    const lastLanguageScore = languageScores[languageScores.length-1];
    const isAnyPropertiesAreNotEmpty = Object.values(lastLanguageScore).some(value => value);
    return isAnyPropertiesAreNotEmpty ? languageScores : languageScores.slice(0, -1);
  };

  const getMergedSubjects = (): string[] => {
    return [...subjects, ...ncsSubjects];
  };

  const getEmptyStringRemovedSubjects = (mergedSubjects: string[]) => {
    const lastMergedSubject = mergedSubjects[mergedSubjects.length-1];
    return lastMergedSubject ? mergedSubjects : mergedSubjects.slice(0, -1);
  };

  const getCertificates= (): string[] => {
    return selectedCertificates.map(
        value => value.hasOwnProperty("label") ? (value as Selected).label : value) as string[];
  };

  const getDepartments = (): string[] => {
    return selectedDepartments.map(
        value => value.hasOwnProperty("label") ? (value as Selected).label : value) as string[];
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
    setLanguageScores([...languageScores, {name: "", score: "", perfectScore: ""}]);
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

  const removeNcsSubject = (value: string): void => {
    setNcsSubjects(ncsSubjects.filter(each => each !== value));
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
            name="name"
            value={languageScore.name}
            onChange={e => changeLanguageScore(e.target.name, e.target.value, index)}
            isInvalid={isFieldError(`languageScores[${index}].name`)}
            autoComplete="off"
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {getFieldErrorReason(`languageScores[${index}].name`)}
          </BootstrapForm.Control.Feedback>
        </Col>
        <Col xs={3}>
          <BootstrapForm.Control
            name="score"
            value={languageScore.score}
            onChange={e => changeLanguageScore(e.target.name, e.target.value, index)}
            isInvalid={isFieldError(`languageScores[${index}].score`)}
            autoComplete="off"
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {getFieldErrorReason(`languageScores[${index}].score`)}
          </BootstrapForm.Control.Feedback>
        </Col>
        <Col xs={3}>
          <InputGroup style={{alignItems: "center"}}>
            <BootstrapForm.Control
              name="perfectScore"
              value={languageScore.perfectScore}
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
            isInvalid={isFieldError(`subjects[${index}]`)}
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
          <BootstrapForm.Control.Feedback type="invalid">
            {getFieldErrorReason(`subjects[${index}]`)}
          </BootstrapForm.Control.Feedback>
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
            isInvalid={isFieldError(`notes[${index}]`)}
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
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason(`notes[${index}]`)}
            </BootstrapForm.Control.Feedback>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    ));
  };

  const isFieldError = (fieldName: string): boolean => {
    if (props.fieldErrors === undefined) {
        return false;
    }
    return props.fieldErrors.some(value => value.field === fieldName);
  };

  const getFieldErrorReason = (fieldName: string): string => {
    if (props.fieldErrors === undefined) {
      return ""
    }
    const fieldError = props.fieldErrors.filter(value => value.field === fieldName);
    if (fieldError.length === 0) {
      return "";
    }
    assert(fieldError.length === 1);
    return fieldError[0].reason;
  };
  
  useEffect(() => {
    fetch("/api/certificate")
      .then(response => response.json())
      .then((data: Certificate[]) => setCertificateOptions(data.map(value => value.name)));
    fetch("/api/department")
      .then(response => response.json())
      .then((data: Department[]) => setDepartmentOptions(data.map(value => value.name)));
  }, []);

  useEffect(() => {
    if (props.announcement === undefined) {
        return;
    }
    setCompanyName(props.announcement.company.companyName);
    setSequence(props.announcement.sequence);
    setReceiptTimestamp(props.announcement.receiptTimestamp);
    setLink(props.announcement.link);
    setLanguageScores(props.announcement.languageScores.map(value => (
        {name: value.languageName, score: value.score, perfectScore: value.perfectScore})));
    setWorkingType(props.announcement.workingType);
    setPositionName(props.announcement.position.positionName);
    setRecruitLevel(props.announcement.recruitLevel);
    setHeadCount(String(props.announcement.headCount));
    setRank(props.announcement.rank);
    setRecruitType(props.announcement.recruitType);
    setDistrictName(props.announcement.districtName);
    setNcsSubjects(props.announcement.subjects
        .filter(value => ncs.includes(value.subjectName))
        .map(value => value.subjectName));
    setSubjects(props.announcement.subjects
        .filter(value => !ncs.includes(value.subjectName))
        .map(value => value.subjectName));
    setSelectedCertificates(props.announcement.certificates);
    setSelectedDepartments(props.announcement.departments);
    setNotes(props.announcement.notes);
  }, [props.announcement]);

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
              isInvalid={isFieldError("companyName")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("companyName")}
            </BootstrapForm.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <BootstrapForm.Label>차수</BootstrapForm.Label>
            <BootstrapForm.Control
              name="sequence"
              value={sequence}
              onChange={e => setSequence(e.target.value)}
              autoComplete="off"
            />
          </Col>
          <Col xs={8}>
            <BootstrapForm.Label>접수일자</BootstrapForm.Label>
            <BootstrapForm.Control
              type="datetime-local"
              name="receiptTimestamp"
              value={receiptTimestamp}
              onChange={e => setReceiptTimestamp(e.target.value)}
              isInvalid={isFieldError("receiptTimestamp")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("receiptTimestamp")}
            </BootstrapForm.Control.Feedback>
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
                  name="name"
                  value={languageScores[0].name}
                  onChange={e => changeLanguageScore(e.target.name, e.target.value, 0)}
                  isInvalid={isFieldError("languageScores[0].name")}
                  autoComplete="off"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {getFieldErrorReason("languageScores[0].name")}
                </BootstrapForm.Control.Feedback>
              </Col>
              <Col xs={3}>
                <BootstrapForm.Control
                  name="score"
                  value={languageScores[0].score}
                  onChange={e => changeLanguageScore(e.target.name, e.target.value, 0)}
                  isInvalid={isFieldError("languageScores[0].score")}
                  autoComplete="off"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {getFieldErrorReason("languageScores[0].score")}
                </BootstrapForm.Control.Feedback>
              </Col>
              <Col xs={3}>
                <BootstrapForm.Control
                  name="perfectScore"
                  value={languageScores[0].perfectScore}
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
              isInvalid={isFieldError("workingType")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("workingType")}
            </BootstrapForm.Control.Feedback>
          </Col>
          <Col xs={6}>
            <BootstrapForm.Label>직군</BootstrapForm.Label>
            <BootstrapForm.Control
              name="positionName"
              value={positionName}
              onChange={e => setPositionName(e.target.value)}
              isInvalid={isFieldError("positionName")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("positionName")}
            </BootstrapForm.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <BootstrapForm.Label>채용수준</BootstrapForm.Label>
            <BootstrapForm.Control
              name="recruitLevel"
              value={recruitLevel}
              onChange={e => setRecruitLevel(e.target.value)}
              isInvalid={isFieldError("recruitLevel")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("recruitLevel")}
            </BootstrapForm.Control.Feedback>
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
          <Col xs={6}>
            <BootstrapForm.Label>채용구분</BootstrapForm.Label>
            <BootstrapForm.Control
              name="recruitType"
              value={recruitType}
              onChange={e => setRecruitType(e.target.value)}
              isInvalid={isFieldError("recruitType")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("recruitType")}
            </BootstrapForm.Control.Feedback>
          </Col>
          <Col xs={6}>
            <BootstrapForm.Label>채용인원</BootstrapForm.Label>
            <BootstrapForm.Control
              name="headCount"
              value={headCount}
              onChange={e => setHeadCount(e.target.value)}
              isInvalid={isFieldError("headCount")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("headCount")}
            </BootstrapForm.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>지역</BootstrapForm.Label>
            <BootstrapForm.Control
              name="districtName"
              value={districtName}
              onChange={e => setDistrictName(e.target.value)}
              isInvalid={isFieldError("districtName")}
              autoComplete="off"
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {getFieldErrorReason("districtName")}
            </BootstrapForm.Control.Feedback>
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
                  isInvalid={isFieldError("subjects[0]")}
                  autoComplete="off"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {getFieldErrorReason("subjects[0]")}
                </BootstrapForm.Control.Feedback>
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
                  isChecked={ncsSubjects.includes(value)}
                  onToggle={isChecked => isChecked ? setNcsSubjects([...ncsSubjects, value]) : removeNcsSubject(value)}
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
              onChange={setSelectedCertificates}
              selected={selectedCertificates}
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
              onChange={setSelectedDepartments}
              selected={selectedDepartments}
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
                  isInvalid={isFieldError("notes[0]")}
                  autoComplete="off"
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {getFieldErrorReason("notes[0]")}
                </BootstrapForm.Control.Feedback>
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
              onClick={submit}
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