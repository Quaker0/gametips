import React, { Component } from 'react';

export default class MostPopular extends Component {
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
      {
        Array.isArray(popularGames) ? (
          <div className='App-header'>
          <h2> Top 10 Most Popular Games </h2>
            <ul>
              {
                popularGames.map(
                  (game, i) => <li key={i} ><a className='main-link' href={'/#/game/' + game.id}>{game.name}</a></li>
                )
              }
            </ul>
          </div>
        ) : (
          <div className='alert alert-danger'><strong>{popularGames.error}</strong></div>
        )
      }
      </div>
    );
  }
}
