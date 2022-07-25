const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError('Необходимо авторизоваться 1');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'super_secret_key');
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться 2');
  }
  req.user = payload;

  next();
};
