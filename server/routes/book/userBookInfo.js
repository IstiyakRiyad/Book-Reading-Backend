const router = require('express').Router();
const Book = require('../../models/book');
const User = require('../../models/user');
const createError = require('http-errors');


router.get('/:bookId', async (req, res, next) => {
    try {
        const {bookId} = req.params;
        const {userId} = req.user;

        const isLike = await Book.findOne({_id: bookId, likes: userId}, {_id: 1});

        const comment = await Book.findOne({_id: bookId, 'comments.user': userId}, {comments: {$elemMatch: {user: userId}}});

        const bookReadingData = await User.findOne({_id: userId, 'readBooks.book': bookId}, {readBooks: {$elemMatch: {book: bookId}}});

        let commentData;
        if(comment) {
            commentData = comment.comments[0];
        }
         console.log({userId, isLike, commentData});

        res.json({
            message: 'User book details',
            data: {
                isLike: isLike ? true: false,
                isComment: comment ? true : false,
                comments: comment && comment.comments[0],
                userData: bookReadingData && bookReadingData.readBooks[0]
            }
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;