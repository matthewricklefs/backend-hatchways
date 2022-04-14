const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const { problemOne, getPosts } = require('./controller/post');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from express!');
});

app.get('/api/ping', problemOne);

app.get('/api/posts/:tags/:sortBy?/:direction?', getPosts);

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
});
