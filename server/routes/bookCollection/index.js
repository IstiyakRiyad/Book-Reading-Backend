const router = require('express').Router();

// Import authorization routes
const isAuth = require('../authorization/isAuth');
const isAdmin = require('../authorization/isAdmin');


// Imports Routes
const create = require('./create');
const getOne = require('./getOne');
const getAll = require('./getAll');
const update = require('./removeBook');
const deleteOne = require('./delete');
const addBook = require('./addBook');



// Middleware
router.use('/', getOne);
router.use('/', getAll);
router.use('/', isAuth, isAdmin, create);
router.use('/', isAuth, isAdmin, update);
router.use('/', isAuth, isAdmin, deleteOne);
router.use('/', isAuth, isAdmin, addBook);

module.exports = router;