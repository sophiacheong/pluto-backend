const configs = require('./config');

const controllers = {
  get: (req, res) => {
    configs.get((err, results) => err ? res.status(404).send(err) : res.status(200).send(results));
  },
}

module.exports = controllers;