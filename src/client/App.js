import React, {Component} from 'react';
import './App.css';
import GameView from './GameView.js';
import Head from './Head.js';
import MostPopular from './MostPopular.js';

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
        <Route exact path='/' component={MostPopular} />
        <Route path='/game/:id' component={GameView} />
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
