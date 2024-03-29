import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../component/Navigation';
import Announcement from '../pages/Announcement';
import Home from '../pages/Home';
import AnnouncementEdit from '../pages/AnnouncementEdit/index';

const Root: React.FC = () => (
  <BrowserRouter>
    <Navigation onExportButtonClick={() => console.log("exportPlainText(gongdbInputData)")} />
    <Container fluid>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/announcement" component={Announcement} exact />
        <Route path="/announcement/:id" component={AnnouncementEdit} exact />
      </Switch>
    </Container>
  </BrowserRouter>
)

export default Root;