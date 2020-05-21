import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { InfoTable } from '../styleTemplate';
import { GameContext } from './GameProvider';

export default class GameInfoTable extends PureComponent {
  render() {
    const { game } = this.props;
    return (
      <InfoTable responsive dark size="sm">
        <tbody>
          <FranchiseRow game={game} />
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
  constructor(props) {
    super(props);
    this.state = { expansions: {} };
    this.resetState = () => this.setState({ expansions: {}, showExpansions: false });
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { game } = this.context;
    const { expansions } = this.state;

    if (
      game && game.expansions
      && game.expansions.length
      && game.expansions[0] !== _.get(expansions[0], 'id')
    ) {
      fetch(`/api/v1/getGame/${game.expansions[0]}`)
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          this.setState({ expansions: [data] });
        });
    } else if ((!game || !game.expansions || !game.expansions.length) && expansions.length) {
      this.resetState();
    }
  }

  toggle() {
    this.setState(state => ({
      showExpansions: !state.showExpansions,
    }));
  }

  render() {
    const { expansions, showExpansions } = this.state;

    if (!expansions || !expansions.length) {
      return null;
    }

    const expansionRows = (
      <tr>
        <th />
        <td>
          {
            expansions.map(expansion => (
              <Link to={`/game/${expansion.id}`} id="expansions" key={`expansion-${expansion}`}>
                {`- ${expansion.name}`}
              </Link>
            ))
            }
        </td>
      </tr>
    );

    return (
      <>
        <tr onClick={this.toggle}>
          <th>Expansions</th>
          <td />
        </tr>
        {
          showExpansions
            ? expansionRows
            : <></>
        }
      </>
    );
  }
}
ExpansionRow.contextType = GameContext;

class PlatformRow extends Component {
  constructor(props) {
    super(props);
    this.state = { platforms: [] };
  }

  componentDidMount() {
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
        this.setState({ platforms: item });
      });
    }
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
  constructor(props) {
    super(props);
    this.state = { genres: {} };
  }

  componentDidMount() {
    const { game } = this.context;
    const { genres } = this.state;
    if (game && game.genres && !Object.keys(genres).length) {
      fetch(`/api/v1/getGenres/${game.genres.join(',')}`)
        .then(res => res.json())
        .then((data) => {
          if (!data.error) {
            this.setState({ genres: data });
          }
        });
    }
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
  constructor(props) {
    super(props);
    this.state = { franchise: null };
    this.loadFranchise = function loadFranchise(franchise) {
      fetch(`/api/v1/getFranchise/${franchise}`)
        .then(res => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          console.log(data);
          return this.setState({ franchise: data });
        });
    };
  }

  componentDidMount() {
    const { game } = this.props;
    if (game && game.franchise) {
      this.loadFranchise(game.franchise);
    }
  }

  shouldComponentUpdate(props, state) {
    const { game } = props;
    if (!state.franchise && props && game.franchise) {
      this.loadFranchise(game.franchise);
      return false;
    }
    return true;
  }

  render() {
    const { franchise } = this.state;
    if (!franchise || !franchise.name) {
      return null;
    }
    return toRowEntry('Franchise', franchise.name);
  }
}
