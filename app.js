require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const { limiter } = require('./middlewares/rateLimit');
const NotFoundError = require('./errors/not-found-err');

const { ROUTE_NOT_FOUND } = require('./errors/error-constunts');

const { DB_URL } = require('./helpers/constants');

const { NODE_ENV, DB, PORT = 3001 } = process.env;

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://movies.gilyova.nomoredomains.xyz',
    'https://movies.gilyova.nomoredomains.xyz',
  ],
  credentials: true,
};

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DB : DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);

app.use(require('./routes/index'));

app.use(() => {
  throw new NotFoundError(ROUTE_NOT_FOUND);
});

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
