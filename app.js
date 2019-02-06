const express = require('express')
const app = express()
const gameClient = require('./game-client.js')
const helmet = require('helmet');
const port = 3000

app.use(helmet());
app.use(express.json());

var gamesPromise = gameClient.listGames();
gamesPromise.then(function(result) {
  console.log('result:', result);
}, function(err) {
  console.log('error: ', err);
})
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
