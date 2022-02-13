const router = require('express').Router();


// Imports Routes
const auth = require('./auth');




// Middleware
router.use('/auth', auth);

module.exports = router;