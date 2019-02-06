const request = require('request')
var exports = module.exports = {};

const authorizedRequest = request.defaults({
  'headers': {
    'user-key': process.env.USER_KEY,
    'accept': 'application/json'
  }
})


exports.listGames = function() {
  const fields = [
    'id', 'name', 'platforms', 'first_release_date',
    'franchise', 'total_rating', 'screenshots'
  ];
  const req = {
    uri: 'https://api-v3.igdb.com/games',
    form: `fields ${fields.join(',')}; sort popularity desc; limit 10;`
  };
  return new Promise(function(resolve, reject) {
    authorizedRequest.get(req, function(err,httpResponse,body) {
      console.log(httpResponse.statusCode)
      if (!err && httpResponse.statusCode === 200) {
        console.log('Success')
        resolve(JSON.parse(body));
      } else {
        var error = JSON.parse(body).result[0]
        reject(new Error(error.title + ': ' + error.cause));
      }
    })
  })
}
