const router = require('express').Router();

const currentlyReading = require('./currentlyReading');


router.use('/current', currentlyReading);

module.exports = router;