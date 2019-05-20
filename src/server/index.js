const express = require('express')
const app = express()
var mcache = require('memory-cache');
const compression = require('compression');
const gameClient = require('./game-client.js');
const steamClient = require('./steam-client.js');
const helmet = require('helmet');
const port = process.env.PORT || 8080;

// app.use(compression());
app.use(express.json());
app.use(express.static('dist'));
app.use(helmet());
app.listen(port, () => console.log(`Express listening on port ${port}!`))

var cache = (hours) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, hours * 1000 * 3600);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.get('/api/v1/popularGames', cache(1), function (req, res) {
  console.log('Popular games requested')
  var gamesPromise = gameClient.listGames();
  gamesPromise.then(function(result) {
    res.send(result);
  }, function(err) {
    console.log('error: ', err);
    res.send({error: err});
  })
})

app.get('/api/v1/getCover/:id', cache(24), function (req, res) {
  console.log(`Cover with ID ${req.params.id} requested`)
  if (!req.params.id) {
    res.status(400).send({'error': '"id" missing from url param'});
  }

  var gamesPromise = gameClient.getCover(req.params.id);
  gamesPromise.then(function(result) {
    console.log('Cover', result[0])
    res.send(result || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: err});
  })
})

app.get('/api/v1/getGame/:id', cache(12), function (req, res) {
  console.log(`Game with ID ${req.params.id} requested`)
  if (!req.params.id) {
    res.status(400).send({'error': '"id" missing from url param'});
  }

  var gamePromise = gameClient.getGame(req.params.id);
  gamePromise.then(function(result) {
    console.log('Game', result)
    res.send(result || {});
  }, function(err) {
    console.log('error: ', err);
    res.status(500).send({error: err});
  })
})

app.get('/api/v1/getFranchise/:id', cache(24), function (req, res) {
  console.log(`Franchise with ID ${req.params.id} requested`)
  if (!req.params.id) {
    res.status(400).send({'error': '"id" missing from url param'});
  }

  var gamePromise = gameClient.getFranchise(req.params.id);
  gamePromise.then(function(result) {
    res.send(result || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: `Got an error from the API. Error: ${err}`});
  })
})

app.get('/api/v1/getPlatforms/:id', cache(24), function (req, res) {
  console.log(`Platform with ID ${req.params.id} requested`)
  if (!req.params.id) {
    res.status(400).send({'error': '"id" missing from url param'});
  }

  var gamePromise = gameClient.getPlatform(req.params.id);
  gamePromise.then(function(result) {
    res.send(result || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: `Got an error from the API. Error: ${err}`});
  })
})

app.get('/api/v1/getGenres/:id', cache(24), function (req, res) {
  console.log(`Genre with ID ${req.params.id} requested`)
  if (!req.params.id) {
    res.status(400).send({'error': '"id" missing from url param'});
  }

  var gamePromise = gameClient.getGenre(req.params.id);
  gamePromise.then(function(result) {
    res.send(result || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: `Got an error from the API. Error: ${err}`});
  })
})

app.post('/api/v1/getSteamGame', cache(24), function (req, res, next) {
  console.log(`Steam game with name ${req.body.name} requested`)
  if (!req.body.name) {
    res.status(400).send({'error': '"name" missing from POST JSON data'});
  }

  var gamePromise = steamClient.getGame(req.body.name);
  gamePromise.then(function(result) {
    console.log('Game:', result)
    res.send(result);
  }, function(err) {
    console.log('Error:', err);
    res.status(500).send({error: err || 'Unknown error'});
  });
})
