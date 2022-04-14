const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 15 });

const verifyCache = (req, res, next) => {
  try {
    const { id } = req.params;
    if (cache.has(id)) {
      return res.status(200).json(cache.get(id));
    }
    return next();
  } catch (error) {
    throw new Error(err);
  }
};

const problemOne = (req, res) => {
  res.status(200).send({
    success: 'true',
  });
};

const getPosts = (req, res) => {
  const { tags, sortBy, direction } = req.params;

  const sortValues = [
    'id',
    'author',
    'authorId',
    'likes',
    'popularity',
    'reads',
    'tags',
  ];

  const directions = ['asc', 'desc'];

  if (sortValues.indexOf(sortBy) === -1) {
    res.status(400).send({
      error: 'sortBy param is invalid',
    });
  }
  if (directions.indexOf(direction) === -1) {
    res.status(400).send({
      error: 'direction param is invalid',
    });
  }

  if (tags.indexOf(',') !== -1) {
    let tagArray = tags.split(',');

    let getTags = tagArray.map((tag, i) => {
      return (
        axios.get(
          `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
        ),
        i
      );
    });

    axios
      .all([...getTags[i]])
      .then(
        axios.spread((...getTags) => {
          let data = [...getTags[i]];
          cache.set(i, data);

          let post = {};
          let posts = [];

          for (let i = 0; i < data.length; i++) {
            let blog = data[i];

            for (let j = 0; j < blog.length; j++) {
              post[blog[j].id] = blog[j];
            }
          }

          for (let key in post) {
            posts.push(post[key]);
          }

          if (sortBy) {
            if (direction === 'desc') {
              posts = posts.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
            } else {
              posts = posts.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : -1));
            }
          }

          res.status(200).send(posts);
        })
      )
      .catch((err) => {
        res.status(400).send({
          error: 'Tags parameter is required',
        });

        console.log(err);
      });
  } else {
    axios
      .get(`http://hatchways.io/api/assessment/blog/posts?tag=${tags}`)
      .then((req) => {
        let data = req.data.posts;

        if (sortBy) {
          if (direction === 'desc') {
            data = data.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
          } else {
            data = data.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : -1));
          }
        }

        res.status(200).send(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(400).send({
          error: 'Tags parameter is required',
        });

        console.log(err);
      });
  }
};

module.exports = {
  problemOne,
  getPosts,
  verifyCache,
};
