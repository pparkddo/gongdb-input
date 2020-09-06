import React, { useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Table } from "react-bootstrap";
import PillCheckbox from './component/PillCheckbox';
import "./App.css";

interface InputData {
  certificates: string
  companyName: string
  departments: string
  headCount: string
  languageScore: string
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
  noticeYear: string
  position: string
  sequence: string
  subjects: string
}

interface FormData {
  certificates: string
  companyName: string
  departments: string
  headCount: string
  languageScore: string
  link: string
  ncs: string
  noticeYear: string
  position: string
  sequence: string
  subjects: string
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
    certificates: inputData.certificates,
    companyName: inputData.companyName,
    departments: inputData.departments, 
    headCount: inputData.headCount,
    languageScore: inputData.languageScore,
    link: inputData.link,
    ncs: getNcsValues(inputData),
    noticeYear: inputData.noticeYear,
    position: inputData.position,
    sequence: inputData.sequence,
    subjects: inputData.subjects
  };
};

const exportJSON = (object: any) => {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
  
  let a = document.createElement("a");
  a.href = "data:" + data;
  a.download = "data.json";

  a.click();
  a.remove();
};

function App() {
  const [formData, setFormData] = useState<FormData[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number>();
  const [toastShow, setToastShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const positionElement = useRef<HTMLInputElement>(null);

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
    positionElement?.current?.focus();
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

  const handleInputClick = (): void => {
    setFormData([...formData, convertInputDataToFormData(getInputData())]);
    clearForm();
    focusOnFirst();
    toastAlert();
  };

  const removeFormData = (removeIndex: number): void => {
    hideModal();
    setFormData(formData.filter((_, index) => index !== removeIndex));
  };

  const hideModal = () => setModalShow(false);
  const showModal = () => setModalShow(true);

  return (
    <Container>
      <Alert
        variant="success"
        show={toastShow} 
        style={{position: "absolute", top: 15, right: 15}}
      >
        정상적으로 입력되었습니다
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
        <Form.Row className="my-5">
          <Col xs={12} md={3}>
            <Form.Label>회사명</Form.Label>
            <Form.Control id="companyName" placeholder="한국전력공사" autoComplete="off" />
          </Col>
          <Col xs={12} md={1}>
            <Form.Label>공고연도</Form.Label>
            <Form.Control id="noticeYear" placeholder="2020" autoComplete="off" />
          </Col>
          <Col xs={12} md={1}>
            <Form.Label>차수</Form.Label>
            <Form.Control id="sequence" placeholder="상반기" autoComplete="off" />
          </Col>
          <Col xs={12} md={2}>
            <Form.Label>지원가능 어학성적</Form.Label>
            <Form.Control id="languageScore" placeholder="700" autoComplete="off" />
          </Col>
          <Col xs={12} md={5}>
            <Form.Label>링크</Form.Label>
            <Form.Control id="link" placeholder="https://recruit.kepco.co.kr" autoComplete="off" />
          </Col>
        </Form.Row>
        <Form.Row className="my-5">
          <Col xs={12} md={3}>
            <Form.Label>직군</Form.Label>
            <Form.Control id="position" className="erasable" placeholder="사무" autoComplete="off" ref={positionElement} />
          </Col>
          <Col xs={12} md={1}>
            <Form.Label>채용인원</Form.Label>
            <Form.Control id="headCount" className="erasable" placeholder="390" autoComplete="off" />
          </Col>
          <Col xs={12} md={8}>
            <Form.Label>과목</Form.Label>
            <Form.Control id="subjects" className="erasable" placeholder="경영,재무,회계" autoComplete="off" />
          </Col>
        </Form.Row>
        <Form.Row className="align-items-center mt-5">
          <Col xs={12} md={6}>
            <Form.Label>지원가능 자격증</Form.Label>
            <Form.Control id="certificates" className="erasable" placeholder="정보처리기사" autoComplete="off" />
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>지원가능 학과</Form.Label>
            <Form.Control id="departments" className="erasable" placeholder="경영학과,경제학과,짱사무스러운학과" autoComplete="off" />
          </Col>
        </Form.Row>
        <Form.Row className="my-5 justify-content-center">
          {
            ncs.map((value, index) => (
              <PillCheckbox 
                key={index}
                id={`ncs${index}`}
                label={value}
              />
            ))
          }
        </Form.Row>
        <Form.Row className="my-5">
          <Col xs={12} md={10}>
            <Button 
              block
              variant="info" 
              onClick={handleInputClick}
            >
              입력
            </Button>
          </Col>
          <Col xs={12} md={2}>
            <Button 
              block
              variant="outline-info" 
              onClick={() => exportJSON(formData)}
            >
              다운로드
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
                <th>링크</th>
                <th>직군</th>
                <th>인원</th>
                <th>과목</th>
                <th>자격증</th>
                <th>학과</th>
                <th>NCS</th>
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
                    <td>{value.noticeYear}</td>
                    <td>{value.sequence}</td>
                    <td>{value.languageScore}</td>
                    <td>{value.link}</td>
                    <td>{value.position}</td>
                    <td>{value.headCount}</td>
                    <td>{value.subjects}</td>
                    <td>{value.certificates}</td>
                    <td>{value.departments}</td>
                    <td>{value.ncs}</td>
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
