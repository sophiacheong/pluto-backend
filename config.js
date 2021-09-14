const axios = require('axios');

const url = 'https://api.hatchways.io/assessment/blog/posts?tag=tech'

const configs = {
  get: (callback, req) => {
    axios.get(url)
      .then((res) => callback(null, res.data))
      .catch((err) => callback(err));
  }
};

module.exports = configs;