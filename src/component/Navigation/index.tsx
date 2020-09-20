import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

interface Props {
  onExportButtonClick: () => void
}

const Navigation = (props: Props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">공디비</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Form</Nav.Link>
        </Nav>
        <Button 
          variant="outline-info" 
          onClick={props.onExportButtonClick}
        >
          데이터 다운로드
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;