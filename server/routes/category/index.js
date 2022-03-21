const router = require('express').Router();

// Import authorization routes
const isAuth = require('../authorization/isAuth');
const isAdmin = require('../authorization/isAdmin');


// Imports Routes
const create = require('./create');
const getAll = require('./getAll');
const deleteOne = require('./delete');
const update = require('./update');


// Middleware
router.use('/', getAll);
router.use('/', isAuth, isAdmin, create);
router.use('/', isAuth, isAdmin, deleteOne);
router.use('/', isAuth, isAdmin, update);


module.exports = router;