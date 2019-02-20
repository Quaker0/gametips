const express = require('express')
const app = express()
const gameClient = require('./game-client.js')
const helmet = require('helmet');
const port = 8080

app.use(express.static('dist'));
app.use(helmet());
app.use(express.json());

app.listen(port, () => console.log(`Express listening on port ${port}!`))

app.get('/api/v1/popularGames', function (req, res) {
  var gamesPromise = gameClient.listGames();
  gamesPromise.then(function(result) {
    res.send(result);
  }, function(err) {
    console.log('error: ', err);
    res.send({error: err});
  })
})

app.get('/api/v1/getGame/:id', function (req, res) {
  console.log(`Game with ID ${req.params.id} requested`)
  var gamePromise = gameClient.getGame(req.params.id);
  gamePromise.then(function(result) {
    res.send(result[0] || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: err});
  })
})

app.get('/api/v1/getFranchise/:id', function (req, res) {
  console.log(`Franchise with ID ${req.params.id} requested`)
  var gamePromise = gameClient.getFranchise(req.params.id);
  gamePromise.then(function(result) {
    res.send(result[0] || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: `Got an error from the API. Error: ${err}`});
  })
})


app.get('/api/v1/getPlatform/:id', function (req, res) {
  console.log(`Platform with ID ${req.params.id} requested`)
  var gamePromise = gameClient.getPlatform(req.params.id);
  gamePromise.then(function(result) {
    res.send(result[0] || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: `Got an error from the API. Error: ${err}`});
  })
})

app.get('/api/v1/getGenres/:ids', function (req, res) {
  console.log(`Platform with ID ${req.params.ids} requested`)
  var gamePromise = gameClient.getGenres(req.params.ids);
  gamePromise.then(function(result) {
    res.send(result[0] || {});
  }, function(err) {
    console.log('error: ', err);
    res.send({error: `Got an error from the API. Error: ${err}`});
  })
})
