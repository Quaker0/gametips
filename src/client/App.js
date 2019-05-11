import React, {Component} from 'react';
import './App.css';
import Head from './Head.js';
import MostPopular from './MostPopular.js';
import GameProvider from './GameProvider.js';
import {GameConsumer} from './GameConsumer.js';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Navbar from 'reactstrap/lib/Navbar';

const Main = () => (
  <Router>
    <div>
      <Route component={Head} />
      <Switch>
        <Route exact path='/' component={MostPopular} />
        <Route path='/game/:id' component={GameView} />
        <Route path='/about' component={About} />
        <Route path='*' component={PageNotFound} />
      </Switch>
      <Route component={Footer} />
    </div>
  </Router>
);

const GameView = props => (
    <GameProvider gameId={props.match.params.id}>
      <GameConsumer />
    </GameProvider>
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

const Footer = () => (
  <Navbar dark className='bg-dark justify-content-between'>
    <form className="form-inline">
      <Link to='/about' className='btn btn-sm btn-outline-secondary'>
        About
      </Link>
    </form>
  </Navbar>
);

export default Main;
