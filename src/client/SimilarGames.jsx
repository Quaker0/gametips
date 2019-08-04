import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Row from 'reactstrap/lib/Row';
import { PropTypes } from 'prop-types';

import { Testamonial, TestamonialItem, Display } from './StyleTemplate';
import CenteredSpinner from './utils';
import { GameContext } from './GameProvider';

export default class SimilarGames extends PureComponent {
  render() {
    return (
      <GameContext.Consumer>
        {ctx => (
          <Display>
            <Row className="p-3 bg-dark border-bottom border-secondary">
              <h3>Similar Games</h3>
            </Row>
            <Testamonial className="py-3 bg-dark">
              <GameLinks similarGames={ctx.game.similar_games} />
            </Testamonial>
          </Display>
        )}
      </GameContext.Consumer>
    );
  }
}

class GameLinks extends Component {
  render() {
    const { similarGames } = this.props;
    if (!similarGames.length) {
      return null;
    }
    return similarGames.slice(0, 10).map(
      gameId => (
        <TestamonialItem key={gameId} className="col-2 d-flex justify-content-center">
          <GameLink gameId={gameId} />
        </TestamonialItem>
      ),
    );
  }
}
GameLinks.defaultProps = { similarGames: [] };
GameLinks.propTypes = { similarGames: PropTypes.arrayOf(PropTypes.node) };

class GameLink extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = { cover: {} };
  }

  componentDidMount(prevProps) {
    this.isMounted = true;
    const { gameId } = this.props;

    if (gameId && this.props !== prevProps) {
      fetch(`/api/v1/getGame/${gameId}`)
        .then(res => res.json())
        .then((gameData) => {
          if (gameData && gameData.cover) {
            fetch(`/api/v1/getCover/${gameData.cover}`)
              .then(res => res.json())
              .then((coverData) => {
                if (this.isMounted) {
                  this.setState({ cover: coverData });
                }
              });
          }
        });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { gameId } = this.props;
    const { cover } = this.state;

    if (!cover.url) {
      return <CenteredSpinner />;
    }
    return (
      <Link to={`/game/${gameId}`}>
        <img
          alt=""
          className="img-fluid rounded"
          src={`https://cors-anywhere.herokuapp.com/https:${cover.url}`}
          crossOrigin="anonymous"
        />
      </Link>
    );
  }
}
GameLink.defaultProps = { gameId: null };
GameLink.propTypes = { gameId: PropTypes.number };
