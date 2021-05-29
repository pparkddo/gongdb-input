import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form as BootstrapForm, Row } from "react-bootstrap";
import FormDivider from "../FormDivider";
import PillCheckbox from "../PillCheckbox";
import "./AnnouncementInputForm.css";

interface AnnouncementInputFormProps {
  onSubmit: () => void;
}

const formStyle = {
  "maxWidth": "500px",
  "margin": "auto",
  "padding": "40px 0",
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
  // languageScore
  // perfectLanguageScore
  const [workingType, setWorkingType] = useState<string>("");
  const [positionName, setPositionName] = useState<string>("");
  const [recruitLevel, setRecruitLevel] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [recruitType, setRecruitType] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isCertReadOnly, setIsCertReadOnly] = useState<boolean>(true);
  const [isDepartmentReadOnly, setIsDepartmentReadOnly] = useState<boolean>(true);
  const [isAnnouncementEtcReadOnly, setIsAnnouncementEtcReadOnly] = useState<boolean>(true);
  const recruitTypeElement = useRef<HTMLInputElement>(null);

  const loadDataToForm = (data: GongdbInputData) => {
    if (data.certificates) {
      setIsCertReadOnly(false);
    }
    (document.getElementsByName("certificates")[0] as HTMLInputElement).value = data.certificates;
    if (data.departments) {
      setIsDepartmentReadOnly(false);
    }
    document.getElementsByName("ncs").forEach((element) => {
      if (data.ncs.includes((element as HTMLInputElement).value) !== (element as HTMLInputElement).checked) {
        element.click();
      }
    });
  };

  const clearForm = (): void => {
    // recruitType
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

  const setReadOnly = (): void => {
    setIsCertReadOnly(true);
    setIsDepartmentReadOnly(true);
  };

  const handleSubmit = () => {
    props.onSubmit();
    focusOnFirst();
    setReadOnly();
  }

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
            <BootstrapForm.Label>지원가능 어학성적</BootstrapForm.Label>
            <BootstrapForm.Control name="languageScore" autoComplete="off" />
          </Col>
          <Col xs={6}>
            <BootstrapForm.Label>어학성적 만점기준</BootstrapForm.Label>
            <BootstrapForm.Control name="perfectLanguageScore" autoComplete="off" />
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
              className="erasable"
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
              className="erasable"
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
            <BootstrapForm.Control
              name="subject"
              className="erasable"
              autoComplete="off"
            />
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
            <BootstrapForm.Control 
              as="textarea"
              name="certificates" 
              className="erasable" 
              autoComplete="off" 
              readOnly={isCertReadOnly}
              tabIndex={isCertReadOnly ? -1 : undefined}
              placeholder={isCertReadOnly ? "활성화하려면 더블클릭" : undefined}
              onDoubleClick={() => setIsCertReadOnly(!isCertReadOnly)}
              style={{
                textAlign: isCertReadOnly ? "center" : "start",
                height: isCertReadOnly ? 40 : 250,
                transition: "height 0.5s"
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>지원가능 학과</BootstrapForm.Label>
            <BootstrapForm.Control 
              as="textarea"
              name="departments" 
              className="erasable" 
              autoComplete="off" 
              readOnly={isDepartmentReadOnly}
              tabIndex={isDepartmentReadOnly ? -1 : undefined}
              placeholder={isDepartmentReadOnly ? "활성화하려면 더블클릭" : undefined}
              onDoubleClick={() => setIsDepartmentReadOnly(!isDepartmentReadOnly)}
              style={{
                textAlign: isDepartmentReadOnly ? "center" : "start",
                height: isDepartmentReadOnly ? 40 : 250,
                transition: "height 0.5s"
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapForm.Label>공고별 기타사항</BootstrapForm.Label>
            <BootstrapForm.Control 
              as="textarea"
              name="announcementEtc" 
              className="erasable" 
              autoComplete="off" 
              readOnly={isAnnouncementEtcReadOnly}
              tabIndex={isAnnouncementEtcReadOnly ? -1 : undefined}
              placeholder={isAnnouncementEtcReadOnly ? "활성화하려면 더블클릭" : undefined}
              onDoubleClick={() => setIsAnnouncementEtcReadOnly(!isAnnouncementEtcReadOnly)}
              style={{
                textAlign: isAnnouncementEtcReadOnly ? "center" : "start",
                height: isAnnouncementEtcReadOnly ? 40 : 250,
                transition: "height 0.5s"
              }}
            />
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