const configs = require('./config');
const axios = require('axios');

const url = 'https://api.hatchways.io/assessment/blog/posts';

const controllers = {
  get: (req, res) => {
    const tagsArr = req.query.tags.split(',');
    const allReq = [];
    tagsArr.forEach(el => allReq.push(axios.get(`${url}?tag=${el}`)));
    axios.all(allReq)
      .then((res) => {
        let temp = res.map(r => r.data);
        let sumOfPost = { post: [] };
        temp.map(el => el.posts.map(inner => sumOfPost.post.push(inner)));
        return sumOfPost;
      })
      .then((sumOfPost) => res.status(200).send(sumOfPost))
      .catch((err) => res.status(404).send(err))
  },
}

module.exports = controllers;