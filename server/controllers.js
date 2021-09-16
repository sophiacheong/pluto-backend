const axios = require('axios');

const url = 'https://api.hatchways.io/assessment/blog/posts';

const controllers = {
  getSuccess: (req, res) => {
    res.status(200).send({ success: true })
  },
  get: (req, res) => {
    if (!req.query.tags) res.status(400).send({ error: "Tags parameter is required" });
    const tagsArr = req.query.tags.split(',');
    let sort = req.query.sortBy;
    let desc;

    if (!sort) sort = 'id';
    if (sort !== 'id' && sort !== 'likes' && sort !== 'reads' && sort !== 'popularity' && !sort ) return res.status(400).send({ error: "sortBy parameter is invalid" })

    if (req.query.direction === 'desc') {
      desc = true;
    } else if (req.query.direction === 'asc' || !req.query.direction) {
      desc = false;
    } else {
      return res.status(400).send({ error: "direction parameter is invalid" })
    }

    const allReq = [];
    tagsArr.forEach(el => allReq.push(axios.get(`${url}?tag=${el}`)));
    axios.all(allReq)
      .then((res) => {
        let temp = res.map(r => r.data);
        let sumOfPost = { post: [] };
        let idSet = new Set();
        temp.map(el => el.posts.map(inner => {
          if (!idSet.has(inner.id)) sumOfPost.post.push(inner);
          idSet.add(inner.id);
        }));
        if (sort && desc) sumOfPost = { post: sumOfPost.post.sort((a, b) => b[sort] - a[sort])}
        else if (sort && !desc) sumOfPost = { post: sumOfPost.post.sort((a, b) => a[sort] - b[sort])}
        return sumOfPost;
      })
      .then((sumOfPost) => res.status(200).send(sumOfPost))
      .catch((err) => res.status(400).send(console.error(err)))
  },
}

module.exports = controllers;