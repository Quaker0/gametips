const request = require('request')
var exports = module.exports = {};
const baseUri = 'https://api-v3.igdb.com'

const authorizedRequest = request.defaults({
  'headers': {
    'user-key': process.env.USER_KEY,
    'accept': 'application/json'
  }
})

exports.getGenres = function(ids) {
  const req = {
    uri: `${baseUri}/genres`,
    form: `fields name,slug; where id={${ids}};`
  };
  return new Promise(prepareRequest(req));
}

exports.getFranchise = function(id) {
  const req = {
    uri: `${baseUri}/franchises`,
    form: `fields name,slug; where id=${id};`
  };
  return new Promise(prepareRequest(req));
}

exports.getPlatform = function(id) {
  const req = {
    uri: `${baseUri}/platforms`,
    form: `fields name,slug,category; where id=${id};`
  };
  return new Promise(prepareRequest(req));
}

exports.getGame = function(gameId) {
  const fields = [
    'id', 'name', 'summary', 'total_rating', 'cover', 'expansions', 'dlcs',
    'franchise', 'platforms', 'first_release_date'
    // 'platforms', 'first_release_date', 'franchise'
  ];
  const req = {
    uri: `${baseUri}/games`,
    form: `fields ${fields.join(',')}; where id = ${gameId};`
  };
  return new Promise(prepareRequest(req));
}

exports.listGames = function() {
  const fields = [
    'id', 'name'
    // 'platforms', 'first_release_date', 'franchise'
  ];
  const req = {
    uri: `${baseUri}/games`,
    form: `fields ${fields.join(',')}; where category = 0;
    sort popularity desc; limit 10;`
  };
  return new Promise(prepareRequest(req));
}


function prepareRequest(req) {
  return (resolve, reject) => {
    authorizedRequest.get(req, function(err,httpResponse,body) {
      if (!err && httpResponse.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        if (httpResponse.statusCode === 401) {
            reject('Auth failed');
        }
        var error = err || error && JSON.parse(body).result[0].title || httpResponse.statusMessage;
        reject(error);
      }
    })
  };
}
