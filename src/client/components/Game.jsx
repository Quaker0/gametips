import React, { Component } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import PropTypes from 'prop-types';

import CenteredSpinner from './CenteredSpinner';
import { GameContext } from './GameProvider';
import {
  Article,
  ArticleText,
  RatingBox,
  RatingText,
  RatingScore,
  RatingMax,
} from '../styleTemplate';

const Game = () => (
  <GameContext.Consumer>
    {ctx => (
      <Article>
        <Row>
          <Col xs="3">
            <Cover coverId={ctx.game.cover} />
          </Col>
          <Col xs="6">
            <h3>
              {' '}
              {ctx.game.name}
              {' '}
            </h3>
          </Col>
          <Col xs="3">
            <RatingComponent rating={ctx.game.total_rating} />
          </Col>
        </Row>
        <h5>
          {' '}
          {ctx.game.summary && 'Summary'}
          {' '}
        </h5>
        <ArticleText>
          {' '}
          {ctx.game.summary}
          {' '}
        </ArticleText>
      </Article>
    )}
  </GameContext.Consumer>
);

class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = { cover: {} };
  }

  componentDidUpdate(prevProps) {
    const { coverId } = this.props;
    if (this.props && coverId && this.props !== prevProps) {
      fetch(`/api/v1/getCover/${coverId}`)
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          this.setState({ cover: data });
        });
    }
  }

  render() {
    const { cover } = this.state;
    if (!cover.url) {
      return <CenteredSpinner />;
    }
    return (
      <img
        alt=""
        className="img-fluid rounded float-right"
        src={`https://cors-anywhere.herokuapp.com/https:${cover.url}`}
        crossOrigin="anonymous"
        height="50"
        width="50"
      />
    );
  }
}
Cover.propTypes = { coverId: PropTypes.number };
Cover.defaultProps = { coverId: null };

const RatingComponent = ({ rating }) => (
  <RatingBox>
    <RatingText>
      <RatingScore>
        {(rating && rating !== 'NaN') ? Math.round(rating) : '-'}
      </RatingScore>
      <RatingMax>/100</RatingMax>
    </RatingText>
  </RatingBox>
);
RatingComponent.propTypes = { rating: PropTypes.number };
RatingComponent.defaultProps = { rating: 0 };

export default Game;
