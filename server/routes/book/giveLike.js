const router = require('express').Router();
const createError = require('http-errors');
const Book = require('../../models/book');


router.patch('/:bookId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {bookId} = req.params;

        const book = await Book.findOneAndUpdate(
            {_id: bookId, likes: {$ne: userId}}, 
            {$push: {likes: userId}, $inc: {like: 1}}
        );

        if(!book) throw createError(403, 'You already liked the book');

        res.json({
            message: 'You have liked the book'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;