const router = require('express').Router();

// Import authorization routes
const isAuth = require('../authorization/isAuth');
const isAdmin = require('../authorization/isAdmin');


// Imports Routes
const create = require('./create');
const getOne = require('./getOne');
const getAll = require('./getAll');
const update = require('./update');
const deleteOne = require('./delete');
const giveLike = require('./giveLike');
const removeLike = require('./removeLike');
const giveFeedback = require('./giveFeedback');
const removeFeedback = require('./removeFeedback');
const startReading = require('./startReading');
const updatePage = require('./updatePage');
const userBookInfo = require('./userBookInfo');



// Middleware
router.use('/', getOne);
router.use('/', getAll);
router.use('/userInfo', isAuth, userBookInfo);
router.use('/giveLike', isAuth, giveLike);
router.use('/removeLike', isAuth, removeLike);
router.use('/insertComment', isAuth, giveFeedback);
router.use('/removeComment', isAuth, removeFeedback);
router.use('/startReading', isAuth, startReading);
router.use('/updatePage', isAuth, updatePage);
router.use('/', isAuth, isAdmin, create);
router.use('/', isAuth, isAdmin, update);
router.use('/', isAuth, isAdmin, deleteOne);

module.exports = router;