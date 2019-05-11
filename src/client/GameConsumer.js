import React, { Component } from 'react';
import {GameContext} from './GameProvider.js'
import Container from 'reactstrap/lib/Container';
import Table from 'reactstrap/lib/Table';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

export class GameConsumer extends Component {
  render() {
    return (
      <div className='App-header'>
        <Container fluid>
          <Row>
            <Col xs='4'></Col>
            <Col xs='4'></Col>
            <Col xs='4'></Col>
            <Col xs='4'></Col>
            <Col xs='4' style={{float: 'left'}}></Col>
          </Row>
          <Row>
            <Col sm='12' md='3'>
              <GameInfoTable />
            </Col>
            <Col sm='12' md='6' className='article-box'>
              <Game />
            </Col>
            <Col sm='12' md='3'></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class Game extends Component {
 render() {
   return (
     <GameContext.Consumer>
     {game => (
         <div className='article'>
            <Container fluid>
              <Row>
                <Col xs='2'></Col>
                <Col xs='8'><h3 className='game-name'> {game.name} </h3></Col>
                <Col xs='2'><RatingComponent rating={game.total_rating}/></Col>
              </Row>
            </Container>
            <h5> Summary </h5>
            <p> {game.summary} </p>
          </div>
      )}
    </GameContext.Consumer>
    );
  }
 }

const RatingComponent = (props) => {
  return (
    <div className='rating-box'>
      <div className='rating-text'>
        <span className='rating-score'>{(props.rating && props.rating !== 'NaN') ? Math.round(props.rating) : '-'}</span>
        <span className='rating-max'>/100</span>
      </div>
    </div>
  );
}


class GameInfoTable extends Component {
  render() {
    return (
        <Table responsive dark size='sm' className='info-table table-condensed'>
          <tbody>
            <FranchiseRow/>
            <GameGenreRow/>
            <ExpansionRow/>
            <ReleasedRow/>
            <PlatformRow/>
          </tbody>
        </Table>
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
    if (this.context && this.context.expansions && !Object.keys(this.state.game).length) {
      fetch(`/api/v1/getGame/${this.context.expansions[0]}`)
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
      if (!this.context || !this.context.first_release_date) {
        return null;
      }
      var release_date_string = new Date(this.context.first_release_date * 1e3).toDateString()
      return toRowEntry('Released', release_date_string);
    }
  }
  ReleasedRow.contextType = GameContext;

class GameGenreRow extends Component {
  constructor(props) {
    super(props)
    this.state = { genres: {} };
  }

  componentDidUpdate() {
    if (this.context && this.context.genres && !Object.keys(this.state.genres).length) {
      fetch(`/api/v1/getGenres/${this.context.genres.join(',')}`)
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
     if (this.context && this.context.franchise && !Object.keys(this.state.franchise).length) {
       fetch(`/api/v1/getFranchise/${this.context.franchise}`)
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
