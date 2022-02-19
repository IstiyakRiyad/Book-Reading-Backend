const router = require('express').Router();
const createError = require('http-errors');
const User = require('../../models/user');
const signUp = require('../../validators/signup');
const {signRefreshToken} = require('../../utils/jwtUtils');
const userInfoByPhone = require('../../utils/getFirebaseUserInfo');
const {checkPassword} = require('../../utils/checkPassword');

router.post('/', async (req, res, next) => {
    try {
        const {name, phone, password} = await signUp.validateAsync(req.body);

        // Check if user already exists
        const user = await User.findOne({phone});
        if(user) throw createError(401, 'User Already Exists');

        // Check Firebase base and get hash and salt
        const {passwordHash, passwordSalt} = await userInfoByPhone(phone);


        // Create Accounts
        const newUser = new User({
            name,
            phone,
            hash: passwordHash,
            salt: passwordSalt,
            role: 'client'
        });

        const createdUser = await newUser.save();

        // Check the user password if it valid or not
        const checkUser = await checkPassword(password, passwordHash, passwordSalt);

        if(!checkUser) throw createError(401, 'Enter valid password');


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