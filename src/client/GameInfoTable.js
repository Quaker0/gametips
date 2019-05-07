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
            <ReleasedRow first_release_date={this.props.game.first_release_date}/>
            <PlatformRow platforms={this.props.game.platforms}/>
          </tbody>
        </table>
      </div>
    );
  }
}

function toRowEntry(header, row) {
  return (
    <tr>
     <th>{header}</th>
     <td>{row}</td>
    </tr>
  );
}

class ExpansionRow extends Component {
  constructor(props) {
    super(props)
    this.state = { game: {} };
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
     return toRowEntry(Expansion, this.state.game.name);
   }
 }

 class PlatformRow extends Component {
   constructor(props) {
     super(props)
     this.state = { platforms: [] };
   }

   componentDidUpdate(prevProps) {
     if (this.props && this.props.platforms && this.props !== prevProps) {
       var promises = [];
       this.props.platforms.forEach(x => {
         promises.push(fetch(`/api/v1/getPlatforms/${x}`)
           .then(res => res.json())
           .then(data => {
            if (data.error) {
               throw new Error(data.error);
             }
             return data;
          }));
        })
        Promise.all(promises).then((platforms) => {
          this.setState({ platforms: platforms});
        })
      }
    }
    render() {
      if (!this.state.platforms.length) {
        return null;
      }
      return toRowEntry(
        'Platforms', this.state.platforms.map(x => x.name).join(', ')
      );
    }
  }

 class ReleasedRow extends Component {
    render() {
      if (!this.props.first_release_date) {
        return null;
      }
      var release_date_string = new Date(this.props.first_release_date * 1e3).toDateString()
      return toRowEntry('Released', release_date_string);
    }
  }

class GameGenreRow extends Component {
  constructor(props) {
    super(props)
    this.state = { genres: {} };
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
     return toRowEntry('Genre', this.state.genres.name);
   }
 }

 class FranchiseRow extends Component {
   constructor(props) {
     super(props)
     this.state = { franchise: {} };
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
      return toRowEntry('Franchise', this.state.franchise.name);
    }
  }
