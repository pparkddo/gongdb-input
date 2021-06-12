import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

interface NavigationProps {
  onExportButtonClick: () => void
}

const Navigation = (props: NavigationProps) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">공디비</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/announcement">List</Nav.Link>
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