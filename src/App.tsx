import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form } from "react-bootstrap";
import "./App.css";
import Alert from './component/Alert';
import DataTable from './component/DataTable';
import Modal from './component/Modal';
import Navigation from './component/Navigation';
import PillCheckbox from './component/PillCheckbox';

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

const getNcsValues = (rawInputData: RawInputData): string => {
  const ncsChecked = [
    rawInputData.ncs0,
    rawInputData.ncs1,
    rawInputData.ncs2,
    rawInputData.ncs3,
    rawInputData.ncs4,
    rawInputData.ncs5,
    rawInputData.ncs6,
    rawInputData.ncs7,
    rawInputData.ncs8,
  ];
  return ncs.filter((_, index) => ncsChecked[index]).join(SEPARATOR);
};

const convertRawInputDataToGongdbInputData = (rawInputData: RawInputData): GongdbInputData => { 
  return {
    workingType: rawInputData.workingType,
    recruitType: rawInputData.recruitType,
    districts: rawInputData.districts,
    recruitLevel: rawInputData.recruitLevel,
    rank: rawInputData.rank,
    certificates: rawInputData.certificates,
    companyName: rawInputData.companyName,
    departments: rawInputData.departments, 
    headCount: rawInputData.headCount,
    languageScore: rawInputData.languageScore,
    perfectLanguageScore: rawInputData.perfectLanguageScore,
    link: rawInputData.link,
    ncs: getNcsValues(rawInputData),
    announcementTimestamp: rawInputData.announcementTimestamp,
    position: rawInputData.position,
    sequence: rawInputData.sequence,
    subjects: rawInputData.subjects,
    isEither: rawInputData.isEither
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
  const [gongdbInputData, setGongdbInputData] = useState<GongdbInputData[]>([]);
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

  const getRawInputData = (): RawInputData => {
    let value = {};

    document.querySelectorAll(".form-control").forEach((element) => {
      const inputValue = (element as HTMLInputElement).value;
      value = {...value, [element.id]: inputValue};
    })
    
    document.querySelectorAll(".form-check-input").forEach((element) => {
      const isChecked = (element as HTMLInputElement).checked;
      value = {...value, [element.id]: isChecked};
    })

    return value as RawInputData;
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
    const data = [...gongdbInputData, convertRawInputDataToGongdbInputData(getRawInputData())];
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

  return (
    <Container>
      <Navigation onExportButtonClick={() => exportJSON(gongdbInputData)} />

      <Alert show={toastShow} />

      <Modal 
        show={modalShow}
        clickedIndex={clickedIndex as number}
        onHideButtonClick={() => setModalShow(false)}
        onRemoveButtonClick={() => {
          removeGongdbInputData(clickedIndex as number);
          setModalShow(false);
        }}
      />

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
        gongdbInputData.length > 0 
        ? <DataTable 
            data={gongdbInputData} 
            onRowClick={(index) => {
              setClickedIndex(index);
              setModalShow(true);
            }}
          /> 
        : null
      }
    </Container>
  );
};

export default App;
