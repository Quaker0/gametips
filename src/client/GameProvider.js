import React, { Component } from 'react';

export const GameContext = React.createContext();

export default class GameProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { game: {}, steam: {}, id: this.props.gameId};
  }

  componentDidMount() {
    if (!Object.keys(this.state.game).length) {
      fetch('/api/v1/getGame/' + this.state.id)
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

  render() {
    return (
      <GameContext.Provider value={this.state}>
        {this.props.children}
      </GameContext.Provider>
    )
  }
}
