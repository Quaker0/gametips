import React, { Component } from 'react';
import { GameContext } from './GameProvider.js'
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

export default class Game extends Component {
 render() {
   return (
     <GameContext.Consumer>
     {game => (
         <div className='article'>
            <Row>
              <Col xs='2'></Col>
              <Col xs='8'><h3 className='game-name'> {game.name} </h3></Col>
              <Col xs='2'><RatingComponent rating={game.total_rating}/></Col>
            </Row>
            <h5> {game.summary && 'Summary'} </h5>
            <p> {game.summary} </p>
          </div>
      )}
    </GameContext.Consumer>
    );
  }
 }

const RatingComponent = (props) => {
  return (
    <div className='rating-box'>
      <div className='rating-text'>
        <span className='rating-score'>{(props.rating && props.rating !== 'NaN') ? Math.round(props.rating) : '-'}</span>
        <span className='rating-max'>/100</span>
      </div>
    </div>
  );
}
