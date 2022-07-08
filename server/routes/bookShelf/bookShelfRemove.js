const router = require('express').Router();
const User = require('../../models/user');


router.delete('/:bookId', async (req, res, next) => {
    try {
        const {bookId} = req.params;
        const {userId} = req.user;

        await User.findOneAndUpdate({_id: userId}, {$pull: {bookShelf: bookId}});

        res.json({
            message: 'Book has been removed from book shelf'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;