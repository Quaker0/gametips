import React, { Component } from 'react';
import Head from './Head.js';
import GameInfoTable from './GameInfoTable.js';
import './App.css';

export default class MainGame extends Component {
  constructor(props) {
    super(props)
    gameId = this.props.match.params.id;
    state = { game: {} };
  }

  componentDidMount() {
    if (!Object.keys(this.state.game).length) {
      fetch('/api/v1/getGame/' + this.gameId)
        .then(res => res.json())
        .then(gameItem => {
          this.setState({ game: gameItem })
       });
    }
 }
  render() {
    const { game } = this.state;
    return (
      <div className='App-header container-fluid'>
        <Head/>
        <div className='row'>
          <div className='col-md-3 left'>
            <GameInfoTable game={game}/>
          </div>
          <div className='col-md-6'>
            <Game game={game}/>
          </div>
          <div className='col-md-3 right'>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends Component {
 render() {
   return (
     <div>
       <RatingComponent rating={this.props.game.total_rating || 0}/>
       <div className='article'>
          <h2 className='game-name'> {this.props.game.name} </h2>
          <h3> Summary </h3>
          <p> {this.props.game.summary} </p>
        </div>
      </div>
   );
 }
}

const RatingComponent = (props) => {
  return (
    <div className='hexagon'>
      <div className='rating-score'>
        {Math.round(props.rating)}
      </div>
    </div>
  );
}
