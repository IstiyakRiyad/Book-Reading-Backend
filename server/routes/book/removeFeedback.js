const router = require('express').Router();
const createError = require('http-errors');
const Book = require('../../models/book');


router.patch('/:bookId', async (req, res, next) => {
    try {
        const {userId: user} = req.user;
        const {bookId} = req.params;


        const book = await Book.findOneAndUpdate(
            {_id: bookId, 'comments.user':  user}, 
            {$pull: {comments: {user}}}
        );

        if(!book) throw createError(403, "You don't have comment in this book");

        const feedback = book.comments.filter(comment => comment.user.toString() === user)[0];

        let {rating} = feedback;
        rating = (book.numberOfRating - 1) > 0 ? (book.rating * book.numberOfRating - rating) / (book.numberOfRating - 1) : 0
        await Book.findOneAndUpdate(
            {_id: bookId},
            {
                $inc: {numberOfRating: -1},
                $set: {rating}
            }
        );

        res.json({
            message: 'Your comment is removed from this book'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;