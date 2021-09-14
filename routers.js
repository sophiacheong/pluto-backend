const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router
  .route('/ping')
  .get(controllers.get)

module.exports = router;
