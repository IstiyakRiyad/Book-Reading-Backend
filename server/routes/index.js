const router = require('express').Router();


// Imports Routes
const auth = require('./auth');
const author = require('./author');



// Middleware
router.use('/auth', auth);
router.use('/author', author);



module.exports = router;