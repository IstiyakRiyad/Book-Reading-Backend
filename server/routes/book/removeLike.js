const router = require('express').Router();
const createError = require('http-errors');
const Book = require('../../models/book');


router.patch('/:bookId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {bookId} = req.params;

        const book = await Book.findOneAndUpdate(
            {_id: bookId, likes: userId}, 
            {$pull: {likes: userId}, $inc: {like: -1}}
        );

        if(!book) throw createError(403, 'Your like is already removed');

        res.json({
            message: 'Your like is removed'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;