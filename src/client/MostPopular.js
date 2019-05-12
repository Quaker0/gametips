import React, { Component } from 'react';
import { MainLink, AppBox } from './StyleTemplate'

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
          <AppBox>
          <h2> Top 10 Most Popular Games </h2>
            <ul>
              {
                popularGames.map(
                  game => (
                    <li key={game.id} >
                      <MainLink href={'/#/game/' + game.id}>
                        {game.name}
                      </MainLink>
                    </li>)
                )
              }
            </ul>
          </AppBox>
        ) : (
          <div className='alert alert-danger'>
            <strong>{popularGames.error}</strong>
          </div>
        )
      }
      </div>
    );
  }
}
