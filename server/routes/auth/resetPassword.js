const router = require('express').Router();
const createError = require('http-errors');
const User = require('../../models/user');
const reset = require('../../validators/login');
const {signRefreshToken} = require('../../utils/jwtUtils');
const userInfoByPhone = require('../../utils/getFirebaseUserInfo');
const {checkPassword} = require('../../utils/checkPassword');

router.post('/', async (req, res, next) => {
    try {
        const {phone, password} = await reset.validateAsync(req.body);

        // Check if user already exists
        const user = await User.findOne({phone});
        if(!user) throw createError(401, 'User not found');

        // Check Firebase base and get hash and salt
        const {passwordHash, passwordSalt} = await userInfoByPhone(phone);


        // Check the user password if it valid or not
        const checkUser = await checkPassword(password, passwordHash, passwordSalt);

        if(!checkUser) throw createError(422, 'Enter valid password');


        // Create Refresh Token
        const refreshToken = await signRefreshToken({userId: user._id, role: user.role}, '180d');

        // Push cookie to sessions in user object and hash and salt to user
        await User.findOneAndUpdate({_id: user._id}, {
            $push: {sessions: refreshToken}, 
            $set: {hash: passwordHash, salt: passwordSalt}
        });

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