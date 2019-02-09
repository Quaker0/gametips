import React, { Component } from 'react';
import './App.css';
import MainGame from './GameView.js';
import Head from './Head.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Main = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/game/:id" component={MainGame} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

const About = () => (
  <div className="App">
  <Head/>
    <header className="App-header">
      <h2>Made by Niclas Bångman</h2>
    </header>
  </div>
);

class Home extends Component {
  state = { popularGames: [] };

  componentDidMount() {
    if (!Object.keys(this.state.popularGames).length) {
      fetch('/api/v1/popularGames')
       .then(res => res.json())
       .then(games => this.setState({ popularGames: games }));
   }
 }

  render() {
    const { popularGames } = this.state;
    return (
      <div className="App">
        <Head/>
        <div className="App-header">
        <h2> Top 10 Most Popular Games </h2>
          <ul>
            {
              popularGames.map((game, i) => <li key={i} ><a className="main-link" href={'/game/' + game.id}>
              {game.name}</a></li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;
