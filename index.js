const express = require('express');
const bodyParser = require('body-parser');
const apicache = require('apicache');

const app = express();
const PORT = process.env.PORT || 3000;
const { problemOne, getPosts } = require('./controller/post');
const cache = apicache.middleware;
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheSuccesses = cache('5 minutes', onlyStatus200);

app.use(bodyParser.json());

app.get('/', cacheSuccesses, (res) => {
  res.send('Hello from express!');
});

app.get('/api/ping', cacheSuccesses, problemOne);

app.get('/api/posts/:tags/:sortBy?/:direction?', cacheSuccesses, getPosts);

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
});
