import React, { useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Nav, Navbar, Table } from "react-bootstrap";
import "./App.css";
import PillCheckbox from './component/PillCheckbox';

interface InputData {
  workingType: string
  recruitType: string
  districts: string
  recruitLevel: string
  rank: string
  certificates: string
  companyName: string
  departments: string
  headCount: string
  languageScore: string
  perfectLanguageScore: string
  label: string
  link: string
  ncs0: boolean
  ncs1: boolean
  ncs2: boolean 
  ncs3: boolean 
  ncs4: boolean 
  ncs5: boolean 
  ncs6: boolean 
  ncs7: boolean 
  ncs8: boolean 
  announcementTimestamp: string
  position: string
  sequence: string
  subjects: string
  isEither: boolean
}

interface FormData {
  workingType: string
  recruitType: string
  districts: string
  recruitLevel: string
  rank: string
  certificates: string
  companyName: string
  departments: string
  headCount: string
  languageScore: string
  perfectLanguageScore: string
  link: string
  ncs: string
  announcementTimestamp: string
  position: string
  sequence: string
  subjects: string
  isEither: boolean
}

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
];

const SEPARATOR = ",";

const getNcsValues = (inputData: InputData): string => {
  const ncsChecked = [
    inputData.ncs0,
    inputData.ncs1,
    inputData.ncs2,
    inputData.ncs3,
    inputData.ncs4,
    inputData.ncs5,
    inputData.ncs6,
    inputData.ncs7,
    inputData.ncs8,
  ];
  return ncs.filter((_, index) => ncsChecked[index]).join(SEPARATOR);
};

const convertInputDataToFormData = (inputData: InputData): FormData => { 
  return {
    workingType: inputData.workingType,
    recruitType: inputData.recruitType,
    districts: inputData.districts,
    recruitLevel: inputData.recruitLevel,
    rank: inputData.rank,
    certificates: inputData.certificates,
    companyName: inputData.companyName,
    departments: inputData.departments, 
    headCount: inputData.headCount,
    languageScore: inputData.languageScore,
    perfectLanguageScore: inputData.perfectLanguageScore,
    link: inputData.link,
    ncs: getNcsValues(inputData),
    announcementTimestamp: inputData.announcementTimestamp,
    position: inputData.position,
    sequence: inputData.sequence,
    subjects: inputData.subjects,
    isEither: inputData.isEither
  };
};

const exportJSON = (object: any): void => {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
  
  let a = document.createElement("a");
  a.href = "data:" + data;
  a.download = "data.json";

  a.click();
  a.remove();
};

const saveJSON = (object: any): void => {
  localStorage.setItem("gongdb-input", JSON.stringify(object));
};

function App() {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number>();
  const [toastShow, setToastShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isCertReadOnly, setIsCertReadOnly] = useState<boolean>(true);
  const [isSubjectReadOnly, setIsSubjectReadOnly] = useState<boolean>(true);

  const recruitTypeElement = useRef<HTMLInputElement>(null);

  const clearForm = (): void => {
    document.querySelectorAll(".erasable").forEach((element) => {
      (element as HTMLInputElement).value = "";
    });

    document.querySelectorAll(".form-check-input").forEach((element) => {
      const isChecked = (element as HTMLInputElement).checked;
      if (isChecked) {
        (element as HTMLInputElement).click();
      }
    });
  };

  const focusOnFirst = (): void => {
    recruitTypeElement?.current?.focus();
  };

  const getInputData = (): InputData => {
    let value = {};

    document.querySelectorAll(".form-control").forEach((element) => {
      const inputValue = (element as HTMLInputElement).value;
      value = {...value, [element.id]: inputValue};
    })
    
    document.querySelectorAll(".form-check-input").forEach((element) => {
      const isChecked = (element as HTMLInputElement).checked;
      value = {...value, [element.id]: isChecked};
    })

    return value as InputData;
  };

  const toastAlert = (): void => {
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 1000);
  };
  
  const setReadOnly = (): void => {
    setIsCertReadOnly(true);
    setIsSubjectReadOnly(true);
  };

  const handleInputClick = (): void => {
    const data = [...formData, convertInputDataToFormData(getInputData())];
    setFormData(data);
    clearForm();
    focusOnFirst();
    toastAlert();
    setReadOnly();
    saveJSON(data);
  };

  const removeFormData = (removeIndex: number): void => {
    hideModal();
    setFormData(formData.filter((_, index) => index !== removeIndex));
  };

  const hideModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">공디비</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Form</Nav.Link>
          </Nav>
          <Button 
            variant="outline-info" 
            onClick={() => exportJSON(formData)}
          >
            데이터 다운로드
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Alert
        variant="success"
        show={toastShow} 
        style={{position: "fixed", top: 15, right: 15}}
      >
        정상적으로 입력되었습니다!
      </Alert>

      <Modal show={modalShow} onHide={hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>데이터 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>{(clickedIndex as number)+1}번 데이터를 삭제하시겠습니까</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={hideModal}>취소</Button>
          <Button variant="danger" onClick={() => removeFormData(clickedIndex as number)}>삭제</Button>
        </Modal.Footer>
      </Modal>

      <Form>
        <Form.Row id="input-form">
          <Col xs={12}>
            <Form.Label>회사명</Form.Label>
            <Form.Control id="companyName" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>접수일자</Form.Label>
            <Form.Control id="announcementTimestamp" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>차수</Form.Label>
            <Form.Control id="sequence" autoComplete="off" />
          </Col>
          <Col xs={12}>
            <Form.Label>링크</Form.Label>
            <Form.Control id="link" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>지원가능 어학성적</Form.Label>
            <Form.Control id="languageScore" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>어학성적 만점기준</Form.Label>
            <Form.Control id="perfectLanguageScore" autoComplete="off" />
          </Col>

          <Col xs={12} className="mt-3">
            <hr />
          </Col>

          <Col xs={6}>
            <Form.Label>근무형태</Form.Label>
            <Form.Control id="workingType" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>직군</Form.Label>
            <Form.Control id="position" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>채용수준</Form.Label>
            <Form.Control id="recruitLevel" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>직급</Form.Label>
            <Form.Control 
              id="rank" autoComplete="off" />
          </Col>

          <Col xs={12} className="mt-3">
            <hr />
          </Col>

          <Col xs={12}>
            <Form.Label>채용구분</Form.Label>
            <Form.Control id="recruitType" className="erasable" autoComplete="off" ref={recruitTypeElement} />
          </Col>
          <Col xs={12}>
            <Form.Label>지역별</Form.Label>
            <Form.Control id="districts" className="erasable" autoComplete="off" />
          </Col>
          <Col xs={12}>
            <Form.Label>과목</Form.Label>
            <Form.Control id="subjects" className="erasable" autoComplete="off" />
          </Col>

          <Col xs={12} className="mt-3">
            <hr />
          </Col>

          <Col xs={12}>
            <Form.Label>지원가능 자격증</Form.Label>
            <Form.Control 
              id="certificates" 
              className="erasable" 
              autoComplete="off" 
              readOnly={isCertReadOnly}
              tabIndex={isCertReadOnly ? -1 : undefined}
              placeholder={isCertReadOnly ? "활성화하려면 클릭" : undefined}
              onClick={() => setIsCertReadOnly(!isCertReadOnly)}
            />
          </Col>
          <Col xs={12}>
            <Form.Label>지원가능 학과</Form.Label>
            <Form.Control 
              id="departments" 
              className="erasable" 
              autoComplete="off" 
              readOnly={isSubjectReadOnly}
              tabIndex={isSubjectReadOnly ? -1 : undefined}
              placeholder={isSubjectReadOnly ? "활성화하려면 클릭" : undefined}
              onClick={() => setIsSubjectReadOnly(!isSubjectReadOnly)}
            />
          </Col>
          {
            !isCertReadOnly && !isSubjectReadOnly
            ? <Col xs={12} className="mt-3 text-right">
                <Form.Check 
                  inline 
                  type="checkbox" 
                  id="isEither"
                  label="둘 중 하나만 만족하면 돼요" 
                  onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === "Enter") {
                      event.currentTarget.checked = !event.currentTarget.checked
                    }
                  }}
                />
              </Col>
            : null
          }
          <Col xs={12} className="my-4 text-center">
            {
              ncs.map((value, index) => (
                <PillCheckbox 
                  key={index}
                  id={`ncs${index}`}
                  label={value}
                />
              ))
            }
          </Col>
          <Col xs={12}>
            <Button 
              block
              variant="info" 
              onClick={handleInputClick}
            >
              입력
            </Button>
          </Col>
        </Form.Row>
      </Form>
      {
        formData.length > 0
        ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>회사명</th>
                <th>공고연도</th>
                <th>차수</th>
                <th>어학</th>
                <th>어학만점</th>
                <th>링크</th>
                <th>직군</th>
                <th>근무형태</th>
                <th>채용구분</th>
                <th>지역</th>
                <th>채용수준</th>
                <th>직급</th>
                <th>인원</th>
                <th>과목</th>
                <th>자격증</th>
                <th>학과</th>
                <th>NCS</th>
                <th>둘중하나</th>
              </tr>
            </thead>
            <tbody>
              {
                formData.map((value, index) => (
                  <tr 
                    key={index} 
                    data-key={index} 
                    onClick={() => {
                      setClickedIndex(index);
                      showModal();
                    }}
                  >
                    <td>{index+1}</td>
                    <td>{value.companyName}</td>
                    <td>{value.announcementTimestamp}</td>
                    <td>{value.sequence}</td>
                    <td>{value.languageScore}</td>
                    <td>{value.perfectLanguageScore}</td>
                    <td>{value.link}</td>
                    <td>{value.position}</td>
                    <td>{value.workingType}</td>
                    <td>{value.recruitType}</td>
                    <td>{value.districts}</td>
                    <td>{value.recruitLevel}</td>
                    <td>{value.rank}</td>
                    <td>{value.headCount}</td>
                    <td>{value.subjects}</td>
                    <td>{value.certificates}</td>
                    <td>{value.departments}</td>
                    <td>{value.ncs}</td>
                    <td>{typeof value.isEither === "boolean" ? String(value.isEither) : ""}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        : null
      }
    </Container>
  );
};

export default App;
