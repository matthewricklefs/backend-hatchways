const axios = require('axios');

const getPosts = async () => {
  const response = await axios.get(
    'https://api.hatchways.io/assessment/blog/posts',
    (req, res) => {
      let data = req.data.posts;
      res.status(200).send(data);
      console.log(data);
    }
  );

  return await response.json();
};

const problemOne = (req, res) => {
  res.status(200).send({
    success: 'true',
  });
};

module.exports = {
  problemOne,
  getPosts,
};
