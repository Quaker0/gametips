import React, {Component} from 'react';
import './App.css';
import MainGame from './GameView.js';
import Head from './Head.js';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

const Main = () => (
  <Router>
    <div>
      <Route component={Head} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/game/:id' component={MainGame} />
        <Route path='/about' component={About} />
        <Route path='*' component={PageNotFound} />
      </Switch>
      <Route component={Footer} />
    </div>
  </Router>
);

const PageNotFound = () => (
  <div className='App'>
    <header className='App-header'>
      <h2>Could not find the page you are looking for...</h2>
    </header>
  </div>
);

const About = () => (
  <div className='App'>
    <header className='App-header'>
      <h2>Made by Niclas Bångman</h2>
    </header>
  </div>
);

class Home extends Component {
  constructor(props) {
   super(props);
   this.state = { popularGames: [] };
 }

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
      <div className='App'>
        <div className='App-header'>
        <h2> Top 10 Most Popular Games </h2>
          <ul>
            {
              Array.isArray(popularGames) ? (
                popularGames.map((game, i) => <li key={i} ><a className='main-link' href={'/#/game/' + game.id}>{game.name}</a></li>)
              ) : (
                <div className='alert alert-danger'><strong>{popularGames.error}</strong></div>
              )

            }
          </ul>
        </div>
      </div>
    );
  }
}

const Footer = () => (
  <nav className='navbar fixed-bottom navbar-dark bg-dark justify-content-between'>
    <form className="form-inline">
      <Link to='/about' className='btn btn-sm btn-outline-secondary'>
        About
      </Link>
    </form>
  </nav>
);

export default Main;
