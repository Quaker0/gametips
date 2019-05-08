import React, { Component } from 'react';

export const GameContext = React.createContext();

export default class GameProvider extends Component {
  constructor(props) {
    super(props)
    this.gameId = this.props.gameId;
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
    return (
      <GameContext.Provider value={this.state.game}>
        {this.props.children}
      </GameContext.Provider>
    )
  }
}
