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
  const [isDepartmentReadOnly, setIsDepartmentReadOnly] = useState<boolean>(true);

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

  const getGongdbInputData = (): GongdbInputData => {
    let value = {} as GongdbInputData;

    document.querySelectorAll(".form-control").forEach((element) => {
      const name = element.attributes.getNamedItem("name")?.value as string;
      const inputValue = (element as HTMLInputElement).value;
      if (name in value) {
        if (Array.isArray(value[name])) {
          value = {...value, [name]: [...value[name] as string[], inputValue]};
        }
        else {
          value = {...value, [name]: [value[name] as string, inputValue]};
        }
      }
      else {
        value = {...value, [name]: inputValue};
      }
    });
    
    document.querySelectorAll(".form-check-input").forEach((element) => {
      const name = element.attributes.getNamedItem("name")?.value as string;
      const isChecked = (element as HTMLInputElement).checked;
      if (name in value) {
        if (Array.isArray(value[name])) {
          value = {...value, [name]: [...value[name] as boolean[], isChecked]};
        }
        else {
          value = {...value, [name]: [value[name] as boolean, isChecked]};
        }
      }
      else {
        value = {...value, [name]: isChecked};
      }
    });

    return value;
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

    document.getElementsByName("ncs").forEach((element, key) => {
      if ((element as HTMLInputElement).checked !== data.ncs[key]) {
        element.click();
      }
    });
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
            <Form.Control name="companyName" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>접수일자</Form.Label>
            <Form.Control name="announcementTimestamp" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>차수</Form.Label>
            <Form.Control name="sequence" autoComplete="off" />
          </Col>
          <Col xs={12}>
            <Form.Label>링크</Form.Label>
            <Form.Control name="link" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>지원가능 어학성적</Form.Label>
            <Form.Control name="languageScore" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>어학성적 만점기준</Form.Label>
            <Form.Control name="perfectLanguageScore" autoComplete="off" />
          </Col>

          <Col xs={12} className="mt-3">
            <hr />
          </Col>

          <Col xs={6}>
            <Form.Label>근무형태</Form.Label>
            <Form.Control name="workingType" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>직군</Form.Label>
            <Form.Control name="position" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>채용수준</Form.Label>
            <Form.Control name="recruitLevel" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <Form.Label>직급</Form.Label>
            <Form.Control name="rank" autoComplete="off" />
          </Col>

          <Col xs={12} className="mt-3">
            <hr />
          </Col>

          <Col xs={12}>
            <Form.Label>채용구분</Form.Label>
            <Form.Control name="recruitType" className="erasable" autoComplete="off" ref={recruitTypeElement} />
          </Col>
          <Col xs={12}>
            <Form.Label>지역별</Form.Label>
            <Form.Control name="districts" className="erasable" autoComplete="off" />
          </Col>
          <Col xs={12}>
            <Form.Label>과목</Form.Label>
            <Form.Control name="subjects" className="erasable" autoComplete="off" />
          </Col>

          <Col xs={12} className="mt-3">
            <hr />
          </Col>

          <Col xs={12}>
            <Form.Label>지원가능 자격증</Form.Label>
            <Form.Control 
              name="certificates" 
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
              name="departments" 
              className="erasable" 
              autoComplete="off" 
              readOnly={isDepartmentReadOnly}
              tabIndex={isDepartmentReadOnly ? -1 : undefined}
              placeholder={isDepartmentReadOnly ? "활성화하려면 클릭" : undefined}
              onClick={() => setIsDepartmentReadOnly(!isDepartmentReadOnly)}
            />
          </Col>
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

      <div 
        style={{
          position: "fixed", 
          width: 50, 
          height: 50, 
          bottom: 20, 
          right: 20, 
          backgroundColor: "#17a2b8", 
          borderRadius: 50, 
          boxShadow: "0 6px 10px 0 #666", 
          transition: "all 0.1s ease-in-out"
        }}
        onClick={() => gongdbInputData.length ? loadDataToForm(gongdbInputData.slice(-1)[0]) : {}}
      />
    </Container>
  );
};

export default App;
