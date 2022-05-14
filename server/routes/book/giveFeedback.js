const router = require('express').Router();
const createError = require('http-errors');
const Book = require('../../models/book');


router.patch('/:bookId', async (req, res, next) => {
    try {
        const {userId: user} = req.user;
        const {bookId} = req.params;
        const {rating, message} = req.body;

        let calRating = rating < 5 ? Math.round(rating) : 5;
        calRating = calRating < 0 ? 0 : calRating;

        const book = await Book.findOneAndUpdate(
            {_id: bookId, 'comments.user': {$ne: user}}, 
            {$push: {comments: {user, rating: calRating, message}}}
        );

        if(!book) throw createError(403, 'You already comments on the book');

        await Book.findOneAndUpdate(
            {_id: bookId},
            {
                $inc: {numberOfRating: 1},
                $set: {rating: (calRating + book.rating * book.numberOfRating) / (book.numberOfRating + 1)}
            }
        );

        res.json({
            message: 'You have commented on this book'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;