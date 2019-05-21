import React, { Component } from 'react';

export const GameContext = React.createContext();

const initialState = { game: {}, steam: {}};
export default class GameProvider extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.loadGames = function() {
      fetch('/api/v1/getGame/' + this.props.gameId)
      .then(res => res.json())
      .then(gameItem => {
        fetch('/api/v1/getSteamGame/', {
          method: 'POST',
          body: JSON.stringify({'name': gameItem.name}),
          headers: new Headers({'content-type': 'application/json'})
        })
        .then(res => res.json())
        .then(steamGame => {
            this.setState({game: gameItem, steam: steamGame});
        });
      });
    }
  }

  componentDidMount() {
    if (!Object.keys(this.state.game).length || (this.state.game.id && this.state.game.id !== this.props.gameId)) {
      this.loadGames();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
      this.loadGames();
    }
  }

  render() {
    return (
      <GameContext.Provider value={this.state}>
        {this.props.children}
      </GameContext.Provider>
    )
  }
}
