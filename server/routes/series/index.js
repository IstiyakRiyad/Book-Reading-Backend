const router = require('express').Router();

// Import authorization routes
const isAuth = require('../authorization/isAuth');
const isAdmin = require('../authorization/isAdmin');


// Imports Routes
const create = require('./create');
const getOne = require('./getOne');
const getAll = require('./getAll');
const deleteOne = require('./delete');
const updateOne = require('./update');



// Middleware
router.use('/', getOne);
router.use('/', getAll);
router.use('/', isAuth, isAdmin, create);
router.use('/', isAuth, isAdmin, deleteOne);
router.use('/', isAuth, isAdmin, updateOne);


module.exports = router;