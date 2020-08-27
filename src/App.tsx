import React from 'react';
import { Button, Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={() => alert("Hello")}>
            Click Me !
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
