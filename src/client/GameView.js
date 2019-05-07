import React, { Component } from 'react';
import GameInfoTable from './GameInfoTable.js';
import './App.css';

export default class GameView extends Component {
  constructor(props) {
    super(props)
    this.gameId = this.props.match.params.id;
    this.state = { game: {} };
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
      <div className='App-header'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-4 left'></div>
            <div className='col-4'></div>
            <div className='col-4 right' style={{float: 'left'}}></div>
          </div>
          <div className='row'>
            <div className='col-sm-12 col-md-3 left'>
              <GameInfoTable game={game}/>
            </div>
            <div className='col-sm-12 col-md-6 article-box'>
              <Game game={game}/>
            </div>
            <div className='col-sm-12 col-md-3 right'>
            </div>
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
       <div className='article'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-2'></div>
              <div className='col-8'><h2 className='game-name'> {this.props.game.name} </h2></div>
              <div className='col-2'><RatingComponent rating={this.props.game.total_rating}/></div>
            </div>
          </div>
          <h3> Summary </h3>
          <p> {this.props.game.summary} </p>
        </div>
      </div>
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
