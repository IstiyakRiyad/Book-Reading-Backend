const router = require('express').Router();

// Import authorization routes
const isAuth = require('../authorization/isAuth');
const isAdmin = require('../authorization/isAdmin');


// Imports Routes
const getOne = require('./getOne');
const update = require('./removeBook');
const addBook = require('./addBook');
const getOneById = require('./getOneById');


// Middleware
router.use('/id', getOneById);
router.use('/', getOne);
router.use('/', isAuth, isAdmin, update);
router.use('/', isAuth, isAdmin, addBook);

module.exports = router;