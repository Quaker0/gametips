import React, { Component } from 'react';
import { GameContext } from './GameProvider.js'
import { InfoTable } from './StyleTemplate';

export default class GameInfoTable extends Component {
  render() {
    return (
        <InfoTable responsive dark size='sm'>
          <tbody>
            <FranchiseRow/>
            <GameGenreRow/>
            <ExpansionRow/>
            <ReleasedRow/>
            <PlatformRow/>
            <SteamDeveloperRow/>
            <SteamPriceRow/>
          </tbody>
        </InfoTable>
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
  if (this.context.game && this.context.game.expansions && !Object.keys(this.state.game).length) {
    fetch(`/api/v1/getGame/${this.context.game.expansions[0]}`)
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
   return toRowEntry('Expansion', this.state.game.name);
 }
}
ExpansionRow.contextType = GameContext;

class PlatformRow extends Component {
 constructor(props) {
   super(props)
   this.state = { platforms: [] };
 }

 componentDidUpdate(prevProps) {
   if (this.context && this.context.platforms && !this.state.platforms.length) {
     var promises = [];
     this.context.platforms.forEach(x => {
       promises.push(fetch(`/api/v1/getPlatforms/${x}`)
         .then(res => res.json())
         .then(data => {
          if (data.error) {
             throw new Error(data.error);
           }
           return data;
        }));
      })
      Promise.all(promises).then((item) => {
        this.setState({ platforms: item});
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
PlatformRow.contextType = GameContext;

class ReleasedRow extends Component {
  render() {
    if (!this.context || !this.context.game.first_release_date) {
      return null;
    }
    var release_date_string = new Date(this.context.game.first_release_date * 1e3).toDateString()
    if (release_date_string === 'Invalid Date') {
      return null;
    }
    return toRowEntry('Released', release_date_string);
  }
}
ReleasedRow.contextType = GameContext;

class SteamPriceRow extends Component {
   render() {
     if (!this.context.steam.price_overview || !this.context.steam.price_overview.final_formatted) {
       return null;
     }
     return toRowEntry('Steam Price', this.context.steam.price_overview.final_formatted);
   }
 }
 SteamPriceRow.contextType = GameContext;

 class SteamDeveloperRow extends Component {
    render() {
      if (!this.context.steam.developers) {
        return null;
      }
      return toRowEntry('Developers', this.context.steam.developers.join(' | '));
    }
  }
  SteamDeveloperRow.contextType = GameContext;

class GameGenreRow extends Component {
  constructor(props) {
    super(props)
    this.state = { genres: {} };
  }

componentDidUpdate() {
  if (this.context.game && this.context.game.genres && !Object.keys(this.state.genres).length) {
    fetch(`/api/v1/getGenres/${this.context.game.genres.join(',')}`)
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
GameGenreRow.contextType = GameContext;

class FranchiseRow extends Component {
 constructor(props) {
   super(props)
   this.state = {franchise: {}};
 }

 componentDidUpdate(prevProps) {
   if (this.context.game && this.context.game.franchise && !Object.keys(this.state.franchise).length) {
     fetch(`/api/v1/getFranchise/${this.context.game.franchise}`)
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
FranchiseRow.contextType = GameContext;
