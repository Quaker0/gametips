import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Spinner from 'reactstrap/lib/Spinner';
import Loadable from 'react-loadable';
import Game from './Game';

const CenteredSpinner = () => (
  <div className='d-flex justify-content-center align-items-center'>
    <Spinner color="light" />
  </div>
);

const LoadableGameInfoTable = Loadable({
  loader: () => import('./GameInfoTable'),
  loading() {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Spinner color="light" />
      </div>
    )
  }
});

export class GameConsumer extends Component {
  render() {
    return (
      <div className='App-header'>
        <Container fluid>
          <Row>
            <Col xs='4'></Col>
            <Col xs='4'></Col>
            <Col xs='4'></Col>
            <Col xs='4'></Col>
            <Col xs='4' style={{float: 'left'}}></Col>
          </Row>
          <Row>
            <Col sm='12' md='3'>
              <LoadableGameInfoTable />
            </Col>
            <Col sm='12' md='6' className='article-box'>
              <Game />
            </Col>
            <Col sm='12' md='3'></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
