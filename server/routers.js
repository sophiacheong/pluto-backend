const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router
  .route('/ping')
  .get(controllers.getSuccess)

router
  .route('/post')
  .get(controllers.get)


module.exports = router;
