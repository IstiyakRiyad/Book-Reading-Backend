const router = require('express').Router();


// Imports Routes
const all = require('./all');
const allClass = require('./allClass');
const oneClass = require('./class');
const topList = require('./topList');


// Middleware
router.use('/', all);
router.use('/class', allClass);
router.use('/allClass', oneClass);
router.use('/topList', topList);

module.exports = router;