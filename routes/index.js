const router = require('express').Router();

const auth = require('../middlewares/auth');

router.post('/signup', require('./auth'));

router.post('/signin', require('./auth'));

router.use(auth);

router.post('/signout', require('./auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
