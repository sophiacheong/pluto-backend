const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routers');

const PORT = 3000;

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`Listening to port${PORT}`));