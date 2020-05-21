const request = require('request');

const baseUri = 'https://api-v3.igdb.com';

if (!process.env.USER_KEY) {
  throw new Error('Missing environment variable');
}

const authorizedRequest = request.defaults({
  headers: {
    'user-key': process.env.USER_KEY,
    accept: 'application/json',
  },
});

function prepareRequest(req) {
  return (resolve, reject) => {
    authorizedRequest.get(req, (err, httpResponse, body) => {
      if (!err && httpResponse.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        if (httpResponse.statusCode === 401) {
          reject('Auth failed');
        }
        reject(err || JSON.parse(body) || httpResponse.statusMessage);
      }
    });
  };
}

module.exports.getGenre = function getGenre(ids) {
  const req = {
    uri: `${baseUri}/genres`,
    form: `fields name,slug; where id = ${ids.split(',').join('| id = ')};`,
  };
  return new Promise(prepareRequest(req));
};

module.exports.getCover = function getCover(id) {
  const req = {
    uri: `${baseUri}/covers`,
    form: `fields url,width,height; where id = ${id};`,
  };
  return new Promise(prepareRequest(req)).then(res => res[0]);
};

module.exports.getFranchise = function getFranchise(id) {
  const req = {
    uri: `${baseUri}/franchises`,
    form: `fields name,slug; where id = ${id};`,
  };
  return new Promise(prepareRequest(req)).then(res => res[0]);
};

module.exports.getPlatform = function getPlatform(id) {
  const req = {
    uri: `${baseUri}/platforms`,
    form: `fields name,slug,category; where id = ${id};`,
  };
  return new Promise(prepareRequest(req)).then(res => res[0]);
};

module.exports.getGame = function getGame(gameId) {
  const fields = [
    'id', 'name', 'summary', 'total_rating', 'cover', 'expansions', 'dlcs',
    'franchise', 'platforms', 'first_release_date', 'external_games',
    'age_ratings', 'game_engines', 'game_modes', 'genres', 'involved_companies',
    'aggregated_rating', 'similar_games',
  ];
  const req = {
    uri: `${baseUri}/games`,
    form: `fields ${fields.join(',')}; where id = ${gameId};`,
  };
  return new Promise(prepareRequest(req)).then(res => res[0]);
};

module.exports.listGames = function listGames() {
  const fields = [
    'id', 'name',
    // 'platforms', 'first_release_date', 'franchise'
  ];
  const req = {
    uri: `${baseUri}/games`,
    form: `fields ${fields.join(',')}; where category = 0;
    sort popularity desc; limit 10;`,
  };
  return new Promise(prepareRequest(req));
};
