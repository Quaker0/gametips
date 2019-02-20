import React, { Component } from 'react';
import './App.css';

export default class GameInfoTable extends Component {
  render() {
    return (
      <div className='table-responsive'>
        <table className='table table-sm table-striped table-condensed'>
          <tbody>
            <FranchiseRow franchise={this.props.game.franchise}/>
            <GameGenreRow genre={this.props.game.genres}/>
            <ExpansionRow expansions={this.props.game.expansions}/>
          </tbody>
        </table>
      </div>
    );
  }
}

class ExpansionRow extends Component {
  constructor() {
      state = { game: {} };
  }

  componentDidUpdate(prevProps) {
    if (this.props && this.props.expansions && this.props !== prevProps) {
      fetch(`/api/v1/getGame/${this.props.expansions[0]}`)
        .then(res => res.json())
        .then(data => {
         if (data.error) {
            throw new Error(data.error);
          }
         this.setState({ game: data});
       });
     }
   }
   render() {
     if (!this.state.game.name) {
       return null;
     }
     return (
       <tr>
        <th>Expansion</th>
        <td>{this.state.game.name}</td>
       </tr>
     );
   }
 }

class GameGenreRow extends Component {
  constructor() {
    state = { genres: {} };
  }

  componentDidUpdate(prevProps) {
    if (this.props && this.props.genres && this.props !== prevProps) {
      fetch(`/api/v1/getGenres/${this.props.genres.join(',')}`)
        .then(res => res.json())
        .then(data => {
         if (data.error) {
            throw new Error(data.error);
          }
         this.setState({ genres: data});
       });
     }
   }

   render() {
     if (!this.state.genres.name) {
       return null;
     }
     return (
       <tr>
        <th>Genre</th>
        <td>{this.state.genres.name}</td>
       </tr>
     );
   }
 }

 class FranchiseRow extends Component {
   constructor() {
     state = { franchise: {} };
   }

   componentDidUpdate(prevProps) {
     if (this.props && this.props.franchise && this.props !== prevProps) {
       fetch(`/api/v1/getFranchise/${this.props.franchise}`)
         .then(res => res.json())
         .then(data => {
          if (data.error) {
             throw new Error(data.error);
           }
          this.setState({ franchise: data });
        });
      }
    }
    render() {
      if (!this.state.franchise.name) {
        return null;
      }
      return (
        <tr>
         <th>Franchise</th>
         <td>{this.state.franchise.name}</td>
        </tr>
      );
    }
  }
