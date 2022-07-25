const mongoose = require('mongoose');
const { URL_REGEX } = require('../helpers/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [URL_REGEX, 'Please fill a valid url'],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [URL_REGEX, 'Please fill a valid url'],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [URL_REGEX, 'Please fill a valid url'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
