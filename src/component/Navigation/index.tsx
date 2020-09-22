import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

interface Props {
  onFormLinkClick: () => void
  onDataLInkClick: () => void
  onExportButtonClick: () => void
}

const Navigation = (props: Props) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="#">공디비</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#form" onClick={props.onFormLinkClick}>Form</Nav.Link>
        <Nav.Link href="#table" onClick={props.onDataLInkClick}>Table</Nav.Link>
      </Nav>
      <Button 
        variant="outline-info" 
        onClick={props.onExportButtonClick}
      >
        데이터 다운로드
      </Button>
    </Navbar>
  );
};

export default Navigation;