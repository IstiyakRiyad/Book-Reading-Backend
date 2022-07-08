const router = require('express').Router();
const User = require('../../models/user');


router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const user = await User
            .findOne({_id: userId}, {bookShelf: 1})
            .populate({ 
                path: 'bookShelf',
                select: '_id name image rating numberOfRating writer',
                populate: {
                    path: 'writer',
                    model: 'author',
                    select: 'name'
                }
            });

        res.json({
            message: 'Book has been removed from book shelf',
            data: {
                bookShelf: user.bookShelf
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;