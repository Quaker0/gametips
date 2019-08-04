const request = require('request');
const _ = require('lodash');

const baseUri = 'https://store.steampowered.com';

function makeRequest(req) {
  return (resolve, reject) => {
    request(req, (error, response, body) => {
      if (error) {
        reject(error);
      }
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        console.log(e);
        reject('Response is not JSON');
      }
    });
  };
}

module.exports.getReviews = function getReviews(gameId) {
  const req = {
    uri: `${baseUri}/appreviews/${gameId}`,
    qs: {
      json: 1,
      language: 'en',
      num_per_page: 5,
    },
  };
  return new Promise(makeRequest(req));
};

function getGameDetails(gameId) {
  const req = {
    uri: `${baseUri}/api/appdetails`,
    qs: {
      appids: gameId,
    },
  };
  return new Promise(makeRequest(req)).then(res => res[gameId].data);
}

const getGames = function getGames() {
  const req = {
    uri: 'https://api.steampowered.com/ISteamApps/GetAppList/v2?format=json',
  };
  return new Promise(makeRequest(req));
};

async function loadDb() {
  const games = await getGames();
  module.db = await _.mapValues(_.keyBy(games.applist.apps, 'name'), 'appid');
}

module.exports.getGame = async function getGame(name) {
  if (!module.db) {
    await loadDb();
  }
  const gameId = await module.db[name];
  return gameId && getGameDetails(gameId);
};
