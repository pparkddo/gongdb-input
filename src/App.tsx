import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Alert from './component/Alert';
import DataTable from './component/DataTable';
import FixedButton from './component/FixedButton';
import Modal from './component/Modal';
import Navigation from './component/Navigation';
import PillCheckbox from './component/PillCheckbox';
import FormDivider from './component/FormDivider';
import { ncs, getGongdbInputData, clearForm, saveJSON, exportJSON } from './utils';
import "./App.css";

type Mode = "FORM" | "DATA";

function App() {
  const [gongdbInputData, setGongdbInputData] = useState<GongdbInputData[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number>();
  const [toastShow, setToastShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isCertReadOnly, setIsCertReadOnly] = useState<boolean>(true);
  const [isDepartmentReadOnly, setIsDepartmentReadOnly] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>("FORM");

  const recruitTypeElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCertReadOnly || isDepartmentReadOnly) {
      (document.getElementsByName("isEither")[0] as HTMLInputElement).checked = false;
    }
  }, [isCertReadOnly, isDepartmentReadOnly])

  useEffect(() => {
    if (isCertReadOnly) {
      (document.getElementsByName("certificates")[0] as HTMLInputElement).value = "";
    }
  }, [isCertReadOnly])

  useEffect(() => {
    if (isDepartmentReadOnly) {
      (document.getElementsByName("departments")[0] as HTMLInputElement).value = "";
    }
  }, [isDepartmentReadOnly])

  const focusOnFirst = (): void => {
    recruitTypeElement?.current?.focus();
  };

  const toastAlert = (): void => {
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 1000);
  };
  
  const setReadOnly = (): void => {
    setIsCertReadOnly(true);
    setIsDepartmentReadOnly(true);
  };

  const handleInputClick = (): void => {
    const data = [...gongdbInputData, getGongdbInputData()];
    setGongdbInputData(data);
    clearForm();
    focusOnFirst();
    toastAlert();
    setReadOnly();
    saveJSON(data);
  };

  const removeGongdbInputData = (removeIndex: number): void => {
    setGongdbInputData(gongdbInputData.filter((_, index) => index !== removeIndex));
  };

  const loadDataToForm = (data: GongdbInputData) => {
    (document.getElementsByName("companyName")[0] as HTMLInputElement).value = data.companyName;
    (document.getElementsByName("announcementTimestamp")[0] as HTMLInputElement).value = data.announcementTimestamp;
    (document.getElementsByName("sequence")[0] as HTMLInputElement).value = data.sequence;
    (document.getElementsByName("link")[0] as HTMLInputElement).value = data.link;
    (document.getElementsByName("languageScore")[0] as HTMLInputElement).value = data.languageScore;
    (document.getElementsByName("perfectLanguageScore")[0] as HTMLInputElement).value = data.perfectLanguageScore;

    (document.getElementsByName("workingType")[0] as HTMLInputElement).value = data.workingType;
    (document.getElementsByName("position")[0] as HTMLInputElement).value = data.position;
    (document.getElementsByName("recruitLevel")[0] as HTMLInputElement).value = data.recruitLevel;
    (document.getElementsByName("rank")[0] as HTMLInputElement).value = data.rank;

    (document.getElementsByName("recruitType")[0] as HTMLInputElement).value = data.recruitType;
    (document.getElementsByName("districts")[0] as HTMLInputElement).value = data.districts;
    (document.getElementsByName("subjects")[0] as HTMLInputElement).value = data.subjects;

    if (data.certificates) {
      setIsCertReadOnly(false);
    }
    (document.getElementsByName("certificates")[0] as HTMLInputElement).value = data.certificates;
    if (data.departments) {
      setIsDepartmentReadOnly(false);
    }
    (document.getElementsByName("departments")[0] as HTMLInputElement).value = data.departments;

    (document.getElementsByName("isEither")[0] as HTMLInputElement).checked = data.isEither;

    document.getElementsByName("ncs").forEach((element) => {
      if (data.ncs.includes((element as HTMLInputElement).value) && !(element as HTMLInputElement).checked) {
        element.click();
      }
    });
  };

  return (
    <>
      <Navigation 
        onFormLinkClick={() => setMode("FORM")}
        onDataLInkClick={() => setMode("DATA")}
        onExportButtonClick={() => exportJSON(gongdbInputData)} 
      />
      <Container fluid>
        <Alert show={toastShow} title="정상적으로 입력되었습니다!" />

        <Modal 
          show={modalShow}
          clickedIndex={clickedIndex as number}
          onHideButtonClick={() => setModalShow(false)}
          onRemoveButtonClick={() => {
            removeGongdbInputData(clickedIndex as number);
            setModalShow(false);
          }}
        />

        {
          mode === "FORM"
          ? <Form id="input-form">
              <Row>
                <Col xs={12}>
                  <FormDivider title="회사정보" />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>회사명</Form.Label>
                  <Form.Control name="companyName" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>차수</Form.Label>
                  <Form.Control name="sequence" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>접수일자</Form.Label>
                  <Form.Control type="date" name="announcementTimestamp" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>지원가능 어학성적</Form.Label>
                  <Form.Control name="languageScore" autoComplete="off" />
                </Col>
                <Col xs={6}>
                  <Form.Label>어학성적 만점기준</Form.Label>
                  <Form.Control name="perfectLanguageScore" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>공고링크</Form.Label>
                  <Form.Control name="link" autoComplete="off" />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col xs={12}>
                  <FormDivider title="채용정보" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>근무형태</Form.Label>
                  <Form.Control name="workingType" autoComplete="off" />
                </Col>
                <Col xs={6}>
                  <Form.Label>직군</Form.Label>
                  <Form.Control name="position" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Label>채용수준</Form.Label>
                  <Form.Control name="recruitLevel" autoComplete="off" />
                </Col>
                <Col xs={6}>
                  <Form.Label>직급</Form.Label>
                  <Form.Control name="rank" autoComplete="off" />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col xs={12}>
                  <FormDivider title="채용상세" />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>채용구분</Form.Label>
                  <Form.Control name="recruitType" className="erasable" autoComplete="off" ref={recruitTypeElement} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>지역</Form.Label>
                  <Form.Control name="districts" className="erasable" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>과목</Form.Label>
                  <Form.Control name="subjects" className="erasable" autoComplete="off" />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>지원가능 자격증</Form.Label>
                  <Form.Control 
                    name="certificates" 
                    className="erasable" 
                    autoComplete="off" 
                    readOnly={isCertReadOnly}
                    tabIndex={isCertReadOnly ? -1 : undefined}
                    placeholder={isCertReadOnly ? "활성화하려면 더블클릭" : undefined}
                    onDoubleClick={() => setIsCertReadOnly(!isCertReadOnly)}
                    onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.style.height = "250px"}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => event.target.style.height = ""}
                    style={{transition: "height 0.5s"}}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Label>지원가능 학과</Form.Label>
                  <Form.Control 
                    name="departments" 
                    className="erasable" 
                    autoComplete="off" 
                    readOnly={isDepartmentReadOnly}
                    tabIndex={isDepartmentReadOnly ? -1 : undefined}
                    placeholder={isDepartmentReadOnly ? "활성화하려면 더블클릭" : undefined}
                    onDoubleClick={() => setIsDepartmentReadOnly(!isDepartmentReadOnly)}
                    onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.style.height = "250px"}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => event.target.style.height = ""}
                    style={{transition: "height 0.5s"}}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="mt-3 text-right">
                  <Form.Check 
                    inline 
                    style={{display: !isCertReadOnly && !isDepartmentReadOnly ? "unset" : "none"}}
                    type="checkbox" 
                    name="isEither"
                    label="둘 중 하나만 만족하면 돼요" 
                    onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                      if (event.key === "Enter") {
                        event.currentTarget.checked = !event.currentTarget.checked
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="my-4 text-center">
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

              <Row className="mt-5">
                <Col xs={12}>
                  <Button 
                    block
                    variant="info" 
                    onClick={handleInputClick}
                  >
                    입력
                  </Button>
                </Col>
              </Row>
            </Form>
          : gongdbInputData.length > 0 
            ? <DataTable 
                data={gongdbInputData} 
                onRowClick={(index) => {
                  setClickedIndex(index);
                  setModalShow(true);
                }}
              /> 
            : <span style={{textAlign: "center", display: "block", paddingTop: 30, fontSize: 20}}>입력된 데이터가 없어요!</span>
        }

        {
          mode === "FORM" 
           ? <FixedButton onClick={() => gongdbInputData.length ? loadDataToForm(gongdbInputData.slice(-1)[0]) : {}} />
           : null
        }

      </Container>
    </>
  );
};

export default App;
