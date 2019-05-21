import React, { Component } from 'react';
import { GameContext } from './GameProvider.js'
import { CenteredSpinner } from './utils.js'
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Loadable from 'react-loadable';
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
     {ctx => (
         <Article>
            <Row>
              <Col xs='3'>
                <Cover coverId={ctx.game.cover}/>
              </Col>
              <Col xs='6'>
                <h3> {ctx.game.name} </h3>
              </Col>
              <Col xs='3'>
                <RatingComponent rating={ctx.game.total_rating}/>
              </Col>
            </Row>
            <h5> {ctx.game.summary && 'Summary'} </h5>
            <ArticleText> {ctx.game.summary} </ArticleText>
          </Article>
      )}
    </GameContext.Consumer>
    );
  }
 }

class Cover extends Component {
  constructor(props) {
    super(props)
    this.state = { cover: {} };
  }

  componentDidUpdate(prevProps) {
    if (this.props && this.props.coverId && this.props !== prevProps) {
      fetch(`/api/v1/getCover/${this.props.coverId}`)
        .then(res => res.json())
        .then(data => {
         if (data.error) {
            throw new Error(data.error);
          }
         this.setState({ cover: data});
       });
     }
   }

 render() {
   if (!this.state.cover.url) {
     return <CenteredSpinner/>;
   }
   return <img className='img-fluid rounded float-right' src={'https://cors-anywhere.herokuapp.com/https:' + this.state.cover.url} crossOrigin='anonymous' height='50' width='50'/>;
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
