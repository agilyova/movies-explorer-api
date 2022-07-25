require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const { limiter } = require('./middlewares/rateLimit');
const NotFoundError = require('./errors/not-found-err');

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

mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

/*app.use(limiter);*/

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().trim().required().min(2)
      .max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signout', logout);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(() => {
  throw new NotFoundError('Запрашиваемый роут не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
