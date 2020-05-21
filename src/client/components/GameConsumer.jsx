import React, { PureComponent } from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Loadable from 'react-loadable';

import CenteredSpinner from './CenteredSpinner';
import Game from './Game';
import SimilarGames from './SimilarGames';
import { AppBox } from '../styleTemplate';
import { GameContext } from './GameProvider';

const LoadableGameInfoTable = Loadable({
  loader: () => import('./GameInfoTable'),
  loading: CenteredSpinner,
});

export default class GameConsumer extends PureComponent {
  state = { error: false }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { game } = this.context;
    if (error) {
      return (<AppBox><h2 className="text-danger">An error occurred</h2></AppBox>);
    }
    return (
      <AppBox>
        <Container fluid>
          <Row>
            <Col sm="12" md="3">
              <LoadableGameInfoTable game={game} />
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
GameConsumer.contextType = GameContext;
