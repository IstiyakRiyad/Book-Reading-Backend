const router = require('express').Router();

const isAuth = require('./authorization/isAuth');

// Imports Routes
const auth = require('./auth');
const profile = require('./profile');
const author = require('./author');
const publisher = require('./publisher');
const category = require('./category');
const subCategory = require('./subCategory');
const book = require('./book');


// Middleware
router.use('/auth', auth);
router.use('/profile', isAuth, profile);
router.use('/author', author);
router.use('/publisher', publisher);
router.use('/category', category);
router.use('/subCategory', subCategory);
router.use('/book', book);

module.exports = router;