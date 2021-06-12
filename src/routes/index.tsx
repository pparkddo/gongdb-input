import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../component/Navigation';
import Announcement from '../pages/Announcement';
import Home from '../pages/Home';

const Root: React.FC = () => (
  <BrowserRouter>
    <Navigation onExportButtonClick={() => console.log("exportPlainText(gongdbInputData)")} />
    <Container fluid>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/announcement" component={Announcement} exact />
      </Switch>
    </Container>
  </BrowserRouter>
)

export default Root;