const axios = require('axios');

const problemOne = (req, res) => {
  res.status(200).send({
    success: 'true',
  });
};

// "posts": [{
// "id": 1,
// "author": "Rylee Paul",
// "authorId": 9,
// "likes": 960,
// "popularity": 0.13,
// "reads": 50361,
// "tags": [ "tech", "health" ]
// },
// ...
// ]

const getPosts = (req, res) => {
  const { tags } = req.params;

  if (tags.indexOf(',') !== -1) {
    let tagArray = tags.split(',');

    let getTags = tagArray.map((tag, i) => {
      return axios.get(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`
      );
    });

    axios
      .all([...getTags])
      .then(
        axios.spread((tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9) => {
          let data = [
            tag1 ? tag1.data.posts : '',
            tag2 ? tag2.data.posts : '',
            tag3 ? tag3.data.posts : '',
            tag4 ? tag4.data.posts : '',
            tag5 ? tag5.data.posts : '',
            tag6 ? tag6.data.posts : '',
            tag7 ? tag7.data.posts : '',
            tag8 ? tag8.data.posts : '',
            tag9 ? tag9.data.posts : '',
          ];

          let post = {};
          let posts = [];

          for (let i = 0; i < data.length; i++) {
            let blog = data[i];

            for (let i = 0; i < blog.length; i++) {
              post[blog[i].id] = blog[i];
            }
          }

          for (let key in post) {
            posts.push(post[key]);
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
};
