const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const { verifyCache, problemOne, getPosts } = require('./controller/post');

app.use(bodyParser.json());

app.get('/', (res) => {
  res.send('Hello from express!');
});

app.get('/api/ping', problemOne);

app.get('/api/posts/:tags/:sortBy?/:direction?', verifyCache, getPosts);

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
});
