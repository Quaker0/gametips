const express = require('express')
const app = express()
const gameClient = require('./game-client.js')
const helmet = require('helmet');
const port = 3001

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

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
    res.send(result[0]);
  }, function(err) {
    console.log('error: ', err);
    res.send({error: err});
  })
})
