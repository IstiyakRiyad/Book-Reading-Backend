const router = require('express').Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const signUp = require('../../validators/signup');
const {signRefreshToken} = require('../../utils/jwtUtils');

router.post('/', async (req, res, next) => {
    try {
        const {name, email, password, phone} = await signUp.validateAsync(req.body);

        // Check if user already exists
        const user = await User.findOne({email});
        if(user) throw createError(401, 'User Already Exists');

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 12);

        // Create Accounts
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            phone,
            role: 'renter'
        });

        const createdUser = await newUser.save();

        // Create Refresh Token
        const refreshToken = await signRefreshToken({userId: createdUser._id, role: createdUser.role}, '180d');

        // Push cookie to sessions in user object
        await User.findOneAndUpdate({_id: createdUser._id}, {$push: {sessions: refreshToken}});

        // Set cookie to response
        res.cookie('refreshToken', refreshToken, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            path: 'api/v1/auth',
            signed: true
        });

        

        res.json({
            message: 'Account created successfully'
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;