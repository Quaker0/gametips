import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Navbar from 'reactstrap/lib/Navbar';
import { PropTypes } from 'prop-types';

import Head from './Head';
import MostPopular from './MostPopular';
import GameProvider from './GameProvider';
import GameConsumer from './GameConsumer';
import { AppBox } from '../styleTemplate';

const GameView = ({ match }) => (
  <GameProvider gameId={parseInt(match.params.id, 10)}>
    <GameConsumer />
  </GameProvider>
);
GameView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

const PageNotFound = () => (
  <AppBox>
    <h2>Could not find the page you are looking for...</h2>
  </AppBox>
);

const About = () => (
  <AppBox>
    <h2>Made by Niclas Bångman</h2>
  </AppBox>
);

const Footer = () => (
  <Navbar dark className="bg-dark justify-content-between">
    <Link to="/about" className="btn btn-sm btn-outline-secondary">
      About
    </Link>
  </Navbar>
);

export default function App() {
  return (
    <Router>
      <>
        <Route component={Head} />
        <Switch>
          <Route exact path="/" component={MostPopular} />
          <Route path="/game/:id" component={GameView} />
          <Route path="/about" component={About} />
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Route component={Footer} />
      </>
    </Router>
  );
}
