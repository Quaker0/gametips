const express = require('express');

const app = express();

const mcache = require('memory-cache');
const helmet = require('helmet');
const gameClient = require('./game-client.js');
const steamClient = require('./steam-client.js');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('dist'));
app.use(helmet());
app.listen(port, () => console.log(`Express listening on port ${port}!`));

const cache = hours => (req, res, next) => {
  const key = `__express__${req.originalUrl}` || req.url;
  const cachedBody = mcache.get(key);
  if (cachedBody) {
    res.send(cachedBody);
    return;
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    mcache.put(key, body, hours * 1000 * 3600);
    res.sendResponse(body);
  };
  next();
};

app.get('/api/v1/popularGames', cache(1), (req, res) => {
  console.log('Popular games requested');
  const gamesPromise = gameClient.listGames();
  gamesPromise.then((result) => {
    res.send(result);
  }, (err) => {
    console.log('error: ', err);
    res.send({ error: err });
  });
});

app.get('/api/v1/getCover/:id', cache(24), (req, res) => {
  console.log(`Cover with ID ${req.params.id} requested`);
  if (!req.params.id) {
    res.status(400).send({ error: '"id" missing from url param' });
  }

  const gamesPromise = gameClient.getCover(req.params.id);
  gamesPromise.then((result) => {
    res.send(result || {});
  }, (err) => {
    console.log('error: ', err);
    res.send({ error: err });
  });
});

app.get('/api/v1/getGame/:id', cache(12), (req, res) => {
  console.log(`Game with ID ${req.params.id} requested`);
  if (!req.params.id) {
    res.status(400).send({ error: '"id" missing from url param' });
  }

  const gamePromise = gameClient.getGame(req.params.id);
  gamePromise.then((result) => {
    res.send(result || {});
  }, (err) => {
    console.log('error: ', err);
    res.status(500).send({ error: err });
  });
});

app.get('/api/v1/getFranchise/:id', cache(24), (req, res) => {
  console.log(`Franchise with ID ${req.params.id} requested`);
  if (!req.params.id) {
    res.status(400).send({ error: '"id" missing from url param' });
  }

  const gamePromise = gameClient.getFranchise(req.params.id);
  gamePromise.then((result) => {
    res.send(result || {});
  }, (err) => {
    console.log('error: ', err);
    res.send({ error: `Got an error from the API. Error: ${err}` });
  });
});

app.get('/api/v1/getPlatforms/:id', cache(24), (req, res) => {
  console.log(`Platform with ID ${req.params.id} requested`);
  if (!req.params.id) {
    res.status(400).send({ error: '"id" missing from url param' });
  }

  const gamePromise = gameClient.getPlatform(req.params.id);
  gamePromise.then((result) => {
    res.send(result || {});
  }, (err) => {
    console.log('error: ', err);
    res.send({ error: `Got an error from the API. Error: ${err}` });
  });
});

app.get('/api/v1/getGenres/:ids', cache(24), (req, res) => {
  console.log(`Genre with IDs ${req.params.ids} requested`);
  if (!req.params.ids) {
    res.status(400).send({ error: 'IDs missing from url param' });
  }

  const gamePromise = gameClient.getGenre(req.params.ids);
  gamePromise.then((result) => {
    res.send(result || {});
  }, (err) => {
    console.log('error: ', err);
    res.send({ error: `Got an error from the API. Error: ${err}` });
  });
});

app.post('/api/v1/getSteamGame', cache(24), (req, res) => {
  console.log(`Steam game with name ${req.body.name} requested`);
  if (!req.body.name) {
    res.status(400).send({ error: '"name" missing from POST JSON data' });
  }

  const gamePromise = steamClient.getGame(req.body.name);
  gamePromise.then((result) => {
    res.send(result || {});
  }, (err) => {
    console.log('Error:', err);
    res.status(500).send({ error: err || 'Unknown error' });
  });
});
