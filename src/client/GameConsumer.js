import React, { Component } from 'react';
import { CenteredSpinner } from './utils.js'
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Loadable from 'react-loadable';
import Game from './Game';
import { AppBox } from './StyleTemplate';

const LoadableGameInfoTable = Loadable({
  loader: () => import('./GameInfoTable'),
  loading() {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <CenteredSpinner />
      </div>
    )
  }
});

export class GameConsumer extends Component {
  render() {
    return (
      <AppBox>
        <Container fluid>
          <Row>
            <Col sm='12' md='3'>
              <LoadableGameInfoTable />
            </Col>
            <Col sm='12' md='6'>
              <Game />
            </Col>
            <Col sm='12' md='3'></Col>
          </Row>
        </Container>
      </AppBox>
    );
  }
}
