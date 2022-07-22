const router = require('express').Router();


// Imports Routes
const all = require('./all');
const allClass = require('./allClass');
const oneClass = require('./class');
const topList = require('./topList');
const audioBook = require('./audioBook');
const collection = require('./collection');


// Middleware
router.use('/', all);
router.use('/class', allClass);
router.use('/allClass', oneClass);
router.use('/topList', topList);
router.use('/audio', audioBook);
router.use('/collection', collection);


module.exports = router;