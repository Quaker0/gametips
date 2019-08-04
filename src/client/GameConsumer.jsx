import React, { PureComponent } from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Loadable from 'react-loadable';

import CenteredSpinner from './utils';
import Game from './Game';
import SimilarGames from './SimilarGames';
import { AppBox } from './StyleTemplate';

const LoadableGameInfoTable = Loadable({
  loader: () => import('./GameInfoTable'),
  loading: CenteredSpinner,
});

export default class GameConsumer extends PureComponent {
  render() {
    return (
      <AppBox>
        <Container fluid>
          <Row>
            <Col sm="12" md="3">
              <LoadableGameInfoTable />
            </Col>
            <Col sm="12" md="6">
              <Game />
            </Col>
            <Col sm="12" md="3" />
          </Row>
          <SimilarGames />
        </Container>
      </AppBox>
    );
  }
}
