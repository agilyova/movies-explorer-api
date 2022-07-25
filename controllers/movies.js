const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const handleMovieNotFound = () => {
  throw new NotFoundError('Фильм не найден');
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }, null, { sort: { _id: -1 } })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.findOne({ owner, movieId })
    .then((movie) => {
      if (movie) {
        return movie;
      }
      return Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      });
    })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        handleMovieNotFound();
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить чужой фильм из избранного');
      }
      return movie.remove();
    })
    .then(() => {
      res.send({ message: 'Фильм успешно удален' });
    })
    .catch(next);
};
