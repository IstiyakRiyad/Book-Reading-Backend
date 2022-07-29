const router = require('express').Router();
const createError = require('http-errors');
const User = require('../../models/user');
const {signRefreshToken, signAccessToken, verifyRefreshToken} = require('../../utils/jwtUtils');

router.post('/', async (req, res, next) => {
    try {
        const {refreshToken} = req.signedCookies;
        
        // Verify the refresh Token
        const payload = await verifyRefreshToken(refreshToken);

        // Check the expire date
        if(payload.exp * 1000 < Date.now()) throw createError(401, 'Token expired');


        // Check if user already exists
        const user = await User.findOne({_id: payload.userId});

        if(!user) throw createError(401, 'Invalid user');
        

        // Create Refresh Token and Access Token
        const newRefreshToken = await signRefreshToken({userId: user._id, role: user.role}, '180d');
        const newAccessToken = await signAccessToken({userId: user._id, role: user.role}, '1d');


        // Push cookie to sessions in user object
        const value = await User.findOneAndUpdate(
            {_id: user._id, sessions: refreshToken}, 
            {$set: {'sessions.$[element]': newRefreshToken}},
            {arrayFilters: [{element: {$eq: refreshToken}}]}
        );

        // Check if the refresh token is not found
        if(!value) {
            // Clear the cookie
            res.clearCookie('refreshToken', {
                path: 'api/v1/auth'
            });
            throw createError(401, 'May be you remove your login sessions or your account is compromised');
        }


        // Set cookie to response
        res.cookie('refreshToken', newRefreshToken, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            path: 'api/v1/auth',
            signed: true
        });

        

        res.json({
            message: 'Access token send successfully',
            accessToken: `Bearer ${newAccessToken}`
        });
    }
    catch(error) {
        next(error);
    }
});



module.exports = router;