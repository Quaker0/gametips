import React, { Component } from 'react';
import './App.css';
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


class Game extends Component {
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
   const { game } = this.state;
   console.log(game);
   return (
     <div className="App">
       <div className="App-header">
         <h2> {game.name} </h2>
         <h3> Summary </h3>
         <p> {game.summary} </p>
       </div>
     </div>
   );
 }
}

export default Main;
