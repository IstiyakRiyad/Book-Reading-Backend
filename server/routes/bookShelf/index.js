const router = require('express').Router();

const bookShelfGet = require('./bookShelfGet');
const bookShelfAdd = require('./bookShelfAdd');
const bookShelfRemove = require('./bookShelfRemove');


router.use('/', bookShelfGet);
router.use('/', bookShelfAdd);
router.use('/', bookShelfRemove);


module.exports = router;