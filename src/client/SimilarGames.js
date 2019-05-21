import React, { Component } from 'react';
import { GameContext } from './GameProvider.js'
import { Link } from 'react-router-dom';
import { CenteredSpinner } from './utils.js'
import Row from 'reactstrap/lib/Row';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import Loadable from 'react-loadable';
import { Testamonial, TestamonialItem, Display } from './StyleTemplate';

export default class SimilarGames extends Component {
 render() {
   return (
     <GameContext.Consumer>
     {ctx => (
      <Display>
        <Row className='p-3 bg-dark border-bottom border-secondary'>
          <h3>Similar Games</h3>
        </Row>
        <Testamonial className='py-3 bg-dark'>
         <GameLinks similarGames={ctx.game.similar_games}/>
        </Testamonial>
      </Display>
    )}
    </GameContext.Consumer>
    );
  }
 }

class GameLinks extends Component {
  render() {
    if (!this.props.similarGames || !this.props.similarGames.length) {
      return null;
    }
    return this.props.similarGames.slice(0,10).map(
      gameId => (
        <TestamonialItem key={gameId} className='col-2 d-flex justify-content-center'>
          <GameLink gameId={gameId}/>
        </TestamonialItem>
      )
    )
  }
}

class GameLink extends Component {
  constructor(props) {
    super(props)
    this.state = { game: {}, cover: {}};
  }

  componentDidMount(prevProps) {
    if (this.props && this.props.gameId && this.props !== prevProps) {
      fetch('/api/v1/getGame/' + this.props.gameId)
      .then(res => res.json())
      .then(gameData => {
        if (gameData && gameData.cover) {
          fetch('/api/v1/getCover/' + gameData.cover)
          .then(res => res.json())
          .then(coverData => {
            this.setState({ cover: coverData, game: gameData});
          });
        }
       });
     }
   }

 render() {
   if (!this.state.cover.url) {
     return <CenteredSpinner/>;
   }
   return (
    <Link to={'/game/' + this.props.gameId}>
      <img
       className='img-fluid rounded'
       src={'https://cors-anywhere.herokuapp.com/https:' + this.state.cover.url}
       crossOrigin='anonymous'
      />
    </Link>
  )
 }
}
