import React, { Component, PureComponent } from 'react';
import { InfoTable } from './StyleTemplate';

import { GameContext } from './GameProvider';

export default class GameInfoTable extends PureComponent {
  render() {
    return (
      <InfoTable responsive dark size="sm">
        <tbody>
          <FranchiseRow />
          <GameGenreRow />
          <ExpansionRow />
          <ReleasedRow />
          <PlatformRow />
          <SteamDeveloperRow />
          <SteamPriceRow />
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
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = { expansion: {} };
    this.resetState = () => {
      if (this.isMounted) {
        this.setState({ expansion: {} });
      }
    };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentDidUpdate() {
    const { game } = this.context;
    const { expansion } = this.state;
    if (game && game.expansions && game.expansions.length && game.expansions[0] !== expansion.id) {
      fetch(`/api/v1/getGame/${game.expansions[0]}`)
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          if (this.isMounted) {
            this.setState({ expansion: data });
          }
        });
    } else if ((!game || !game.expansions || !game.expansions.length) && expansion.name) {
      this.resetState();
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { expansion } = this.state;
    if (!expansion || !expansion.name) {
      return null;
    }
    return toRowEntry('Expansion', expansion.name);
  }
}
ExpansionRow.contextType = GameContext;

class PlatformRow extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = { platforms: [] };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentDidUpdate() {
    const { platforms } = this.context;
    if (platforms && !platforms.length) {
      const promises = [];
      platforms.forEach((x) => {
        promises.push(fetch(`/api/v1/getPlatforms/${x}`)
          .then(res => res.json())
          .then((data) => {
            if (data.error) {
              throw new Error(data.error);
            }
            return data;
          }));
      });
      Promise.all(promises).then((item) => {
        if (this.isMounted) {
          this.setState({ platforms: item });
        }
      });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { platforms } = this.state;
    if (!platforms || !platforms.length) {
      return null;
    }
    return toRowEntry(
      'Platforms', platforms.map(x => x.name).join(', '),
    );
  }
}
PlatformRow.contextType = GameContext;

class ReleasedRow extends Component {
  render() {
    const { game } = this.context;
    if (!game || !game.first_release_date) {
      return null;
    }
    const releaseDate = new Date(game.first_release_date * 1e3).toDateString();
    if (releaseDate === 'Invalid Date') {
      return null;
    }
    return toRowEntry('Released', releaseDate);
  }
}
ReleasedRow.contextType = GameContext;

class SteamPriceRow extends Component {
  render() {
    const { steam } = this.context;
    if (!steam || !steam.price_overview || !steam.price_overview.final_formatted) {
      return null;
    }
    return toRowEntry('Steam Price', steam.price_overview.final_formatted);
  }
}
SteamPriceRow.contextType = GameContext;

class SteamDeveloperRow extends Component {
  render() {
    const { steam } = this.context;
    if (!steam || !steam.developers) {
      return null;
    }
    return toRowEntry('Developers', steam.developers.join(' | '));
  }
}
SteamDeveloperRow.contextType = GameContext;

class GameGenreRow extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = { genres: {} };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentDidUpdate() {
    const { game } = this.context;
    const { genres } = this.state;
    if (game && game.genres && !Object.keys(genres).length) {
      fetch(`/api/v1/getGenres/${game.genres.join(',')}`)
        .then(res => res.json())
        .then((data) => {
          if (!data.error && this.isMounted) {
            this.setState({ genres: data });
          }
        });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { genres } = this.state;
    if (!genres.length) {
      return null;
    }
    return toRowEntry('Genres', genres.map(x => x.name).join(', '));
  }
}
GameGenreRow.contextType = GameContext;

class FranchiseRow extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = { franchise: {} };
    this.resetState = () => {
      if (this.isMounted) {
        this.setState({ franchise: {} });
      }
    };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentDidUpdate() {
    const { game } = this.context;
    const { franchise } = this.state;
    if (game && game.franchise && franchise.id !== game.franchise) {
      fetch(`/api/v1/getFranchise/${game.franchise}`)
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          if (this.isMounted) {
            this.setState({ franchise: data });
          }
        });
    } else if ((!game || !game.franchise) && franchise.name) {
      this.resetState();
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { franchise } = this.state;
    if (!franchise || !franchise.name) {
      return null;
    }
    return toRowEntry('Franchise', franchise.name);
  }
}
FranchiseRow.contextType = GameContext;
