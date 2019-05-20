const request = require('request');
var exports = module.exports = {};
const baseUri = 'https://store.steampowered.com'
const _ = require('lodash');

exports.getReviews = function(gameId) {
  const req = {
    uri: `${baseUri}/appreviews/${gameId}`,
    qs: {
      'json': 1,
      'language': 'en',
      'num_per_page': 5
    }
  };
  return new Promise(makeRequest(req));
}

function getGameDetails(gameId) {
  const req = {
    uri: `${baseUri}/api/appdetails`,
    qs: {
      'appids': gameId
    }
  };
  return new Promise(makeRequest(req)).then(function (res) {
    return res[gameId].data;
  });
}

exports.getGame = async function(name) {
  if (!module.db) {
    await loadDb();
  }
  const gameId = await module.db[name];
  return getGameDetails(gameId);
}

async function loadDb() {
  const games = await getGames();
  module.db = await _.mapValues(_.keyBy(games.applist.apps, 'name'), 'appid');
}

const getGames = function() {
  const req = {
    uri: `https://api.steampowered.com/ISteamApps/GetAppList/v2?format=json`,
  }
  return new Promise(makeRequest(req));
}

function makeRequest(req) {
  return (resolve, reject) => {
    request(req, function(error, response, body) {
      if(error) {
        reject(error);
      }
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        console.log(e);
        reject('Response is not JSON');
      }
    })
  }
}
