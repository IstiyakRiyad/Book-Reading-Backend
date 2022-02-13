const router = require('express').Router();


// Imports Routes
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const resetPassword = require('./resetPassword');
const refreshToken = require('./refreshToken');




// Middleware
router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/resetPassword', resetPassword);
router.use('/refreshToken', refreshToken);

module.exports = router;