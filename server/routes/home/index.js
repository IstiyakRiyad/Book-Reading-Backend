const router = require('express').Router();


// Imports Routes
const all = require('./all');
const allClass = require('./allClass');
const oneClass = require('./class');
const topList = require('./topList');
const audioBook = require('./audioBook');
const collection = require('./collection');
const popularAuthor = require('./popularAuthor');


// Middleware
router.use('/', all);
router.use('/class', allClass);
router.use('/allClass', oneClass);
router.use('/topList', topList);
router.use('/audio', audioBook);
router.use('/collection', collection);
router.use('/popularAuthor', popularAuthor);



module.exports = router;