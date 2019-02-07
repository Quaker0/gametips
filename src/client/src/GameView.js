import React, { Component } from 'react';
import './App.css';

export default class Game extends Component {
  state = { game: {} };

  constructor(props) {
    super(props)
    this.gameId = this.props.match.params.id;
  }

  componentDidMount() {
    fetch('/api/v1/getGame/' + this.gameId)
      .then(res => res.json())
     .then(gameItem => this.setState({ game: gameItem }));
 }

 render() {
   console.log(this.state.game)
   return (
     <div className='App'>
      <div className='App-header'>
        <div className='side left-side'></div>
         <div className='container'>
         <RatingComponent rating={this.state.game.total_rating || 0}/>
         <div className='article'>
            <h2> {this.state.game.name} </h2>
            <h3> Summary </h3>
            <p> {this.state.game.summary} </p>
          </div>
         </div>
         <div className='side right-side'></div>
       </div>
     </div>
   );
 }
}

const RatingComponent = (props) => {
  return (
    //<div className='inner-container'>
      <div className='hexagon'>
        <div className='rating-score'>
          {Math.round(props.rating)}
        </div>
      </div>
    //</div>
  )
}
