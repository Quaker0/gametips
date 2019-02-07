const request = require('request')
var exports = module.exports = {};
const baseUri = 'https://api-v3.igdb.com'

const authorizedRequest = request.defaults({
  'headers': {
    'user-key': process.env.USER_KEY,
    'accept': 'application/json'
  }
})


exports.getGame = function(id) {
  const fields = [
    'id', 'name', 'summary', 'total_rating'
    // 'platforms', 'first_release_date', 'franchise'
  ];
  const req = {
    uri: `${baseUri}/games`,
    form: `fields ${fields.join(',')}; where id = ${id};`
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
            reject(new Error('Auth failed'));
        }
        var error = JSON.parse(body).result[0]
        reject(new Error(error.title + ': ' + error.cause));
      }
    })
  };
}
