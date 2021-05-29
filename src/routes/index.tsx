import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DataTable from '../component/DataTable';
import Navigation from '../component/Navigation';
import Home from '../pages/Home';

const Root: React.FC = () => (
  <BrowserRouter>
    <Navigation onExportButtonClick={() => console.log("exportPlainText(gongdbInputData)")} />
    <Container fluid>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/table" component={() => {
          return <DataTable data={[]} onRowClick={() => {}} onRowDoubleClick={() => {}} />;
        }} />
      </Switch>
    </Container>
  </BrowserRouter>
)

export default Root;