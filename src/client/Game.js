import React, { Component } from 'react';
import { GameContext } from './GameProvider.js'
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import {
  Article,
  ArticleText,
  RatingBox,
  RatingText,
  RatingScore,
  RatingMax
} from './StyleTemplate';

export default class Game extends Component {
 render() {
   return (
     <GameContext.Consumer>
     {game => (
         <Article>
            <Row>
              <Col xs='2'></Col>
              <Col xs='8'><h3> {game.name} </h3></Col>
              <Col xs='2'><RatingComponent rating={game.total_rating}/></Col>
            </Row>
            <h5> {game.summary && 'Summary'} </h5>
            <ArticleText> {game.summary} </ArticleText>
          </Article>
      )}
    </GameContext.Consumer>
    );
  }
 }

const RatingComponent = (props) => {
  return (
    <RatingBox>
      <RatingText>
        <RatingScore>
          {(props.rating && props.rating !== 'NaN') ? Math.round(props.rating) : '-'}
        </RatingScore>
        <RatingMax>/100</RatingMax>
      </RatingText>
    </RatingBox>
  );
}
