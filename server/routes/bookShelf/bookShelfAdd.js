const router = require('express').Router();
const User = require('../../models/user');


router.put('/:bookId', async (req, res, next) => {
    try {
        const {bookId} = req.params;
        const {userId} = req.user;

        await User.findOneAndUpdate({_id: userId}, {$push: {bookShelf: bookId}});

        res.json({
            message: 'Book is added to book shelf'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;