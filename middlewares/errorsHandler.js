const { INTERNAL_SERVER_ERROR } = require('../errors/error-constunts');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  console.error(err.stack);

  res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });

  return next();
};
