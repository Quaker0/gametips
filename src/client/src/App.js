import React, { Component } from 'react';
import './App.css';
import Game from './GameView.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Main = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/game/:id" component={Game} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

const About = () => (
  <div className="App">
    <header className="App-header">
      <h2>Made by Niclas Bångman</h2>
    </header>
  </div>
);

class Home extends Component {
  state = { popularGames: [] };

  componentDidMount() {
   fetch('/api/v1/popularGames')
     .then(res => res.json())
     .then(games => this.setState({ popularGames: games }));
 }

  render() {
    const { popularGames } = this.state;
    return (
      <div className="App">
        <div className="App-header">
        <h2> Top 10 Most Popular Games </h2>
          <ul>
            {
              popularGames.map((game, i) => <li key={i}><a href={'/game/' + game.id}>
              {game.name}</a></li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;
