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
const series = require('./series');
const bookCollection = require('./bookCollection');
const home = require('./home');
const search = require('./search');
const dashboard = require('./dashboard')


// Middleware
router.use('/auth', auth);
router.use('/profile', isAuth, profile);
router.use('/author', author);
router.use('/publisher', publisher);
router.use('/category', category);
router.use('/subCategory', subCategory);
router.use('/book', book);
router.use('/series', series);
router.use('/collection', bookCollection);
router.use('/home', home);
router.use('/search', search);
router.use('/dashboard', dashboard);



module.exports = router;