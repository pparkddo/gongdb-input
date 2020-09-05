import React from 'react';
import { Col, Container, Form } from "react-bootstrap";
import PillCheckbox from './component/PillCheckbox';

function App() {
  return (
    <Container>
      <Form>
        <Form.Row className="my-5">
          <Col xs={12} md={3}>
            <Form.Label>회사명</Form.Label>
            <Form.Control placeholder="한국전력공사" />
          </Col>
          <Col xs={12} md={1}>
            <Form.Label>공고연도</Form.Label>
            <Form.Control placeholder="2020" />
          </Col>
          <Col xs={12} md={1}>
            <Form.Label>차수</Form.Label>
            <Form.Control placeholder="상반기" />
          </Col>
          <Col xs={12} md={2}>
            <Form.Label>지원가능 어학성적</Form.Label>
            <Form.Control placeholder="700" />
          </Col>
          <Col xs={12} md={5}>
            <Form.Label>링크</Form.Label>
            <Form.Control placeholder="https://recruit.kepco.co.kr" />
          </Col>
        </Form.Row>
        <Form.Row className="my-5">
          <Col xs={12} md={3}>
            <Form.Label>직군</Form.Label>
            <Form.Control placeholder="사무" />
          </Col>
          <Col xs={12} md={1}>
            <Form.Label>채용인원</Form.Label>
            <Form.Control placeholder="390" />
          </Col>
          <Col xs={12} md={8}>
            <Form.Label>과목</Form.Label>
            <Form.Control placeholder="경영,재무,회계" />
          </Col>
        </Form.Row>
        <Form.Row className="align-items-center mt-5">
          <Col xs={12} md={6}>
            <Form.Label>지원가능 자격증</Form.Label>
            <Form.Control placeholder="정보처리기사" />
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>지원가능 학과</Form.Label>
            <Form.Control placeholder="경영학과,경제학과,짱사무스러운학과" />
          </Col>
        </Form.Row>
        <Form.Row className="my-5">
          {
            [
              "의사소통능력",
              "문제해결능력",
              "대인관계능력",
              "자원관리능력",
              "직업윤리",
              "정보능력",
              "수리능력",
              "직무수행능력",
              "전공능력",
            ].map((value, index) => (
              <PillCheckbox 
                key={index}
                id={`check-${index}`}
                label={value}
              />
            ))
          }
        </Form.Row>
      </Form>
    </Container>
  );
};

export default App;
