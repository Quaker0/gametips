import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export const GameContext = React.createContext();

const initialState = { game: {} };
export default class GameProvider extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = initialState;
    this.loadGame = function loadGame(newGameId) {
      fetch(`/api/v1/getGame/${newGameId}`)
        .then(res => res.json())
        .then((gameItem) => {
          if (this.isMounted) {
            this.setState({ game: gameItem });
          }
        });
    };
  }

  componentDidMount() {
    this.isMounted = true;
    const { game } = this.state;
    const { gameId } = this.props;
    if (!Object.keys(game).length || game.id !== gameId) {
      this.loadGame(gameId);
    }
  }

  componentDidUpdate(prevProps) {
    const { gameId } = this.props;
    if (prevProps.gameId !== gameId) {
      this.loadGame(gameId);
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { children } = this.props;
    return (
      <GameContext.Provider value={this.state}>
        { children }
      </GameContext.Provider>
    );
  }
}
GameProvider.propTypes = {
  gameId: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
