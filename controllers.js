const axios = require('axios');

const url = 'https://api.hatchways.io/assessment/blog/posts';

const controllers = {
  getSuccess: (req, res) => {
    res.status(200).send({ success: true })
  },
  get: (req, res) => {
    if (!req.query.tags) res.status(404).send({ error: "Tags parameter is required" });
    const tagsArr = req.query.tags.split(',');
    const sort = req.query.sortBy
    const allReq = [];
    tagsArr.forEach(el => allReq.push(axios.get(`${url}?tag=${el}`)));
    axios.all(allReq)
      .then((res) => {
        let temp = res.map(r => r.data);
        let sumOfPost = { post: [] };
        temp.map(el => el.posts.map(inner => sumOfPost.post.push(inner)));
        if (sort) sumOfPost = { post: sumOfPost.post.sort((a, b) => a[sort] - b[sort])}
        return sumOfPost;
      })
      .then((sumOfPost) => res.status(200).send(sumOfPost))
      .catch((err) => res.status(404).send(console.error(err)))
  },
}

module.exports = controllers;