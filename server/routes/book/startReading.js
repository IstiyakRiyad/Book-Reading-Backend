const router = require('express').Router();
const createError = require('http-errors');
const Book = require('../../models/book');
const User = require('../../models/user');


router.patch('/:bookId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {bookId} = req.params;
        const {type} = req.body;

        if(!(type === 'pdf' || type === 'audio')) throw createError(403, 'pdf and audio is only type option');
        
        const user = await User.findOneAndUpdate(
            {_id: userId, $or: [
                {'readBooks.type': {$ne: type}, 'readBooks.book': {$ne: bookId}},
                {'readBooks.type': {$ne: type}, 'readBooks.book': bookId}
            ]},
            {$push: {readBooks: {book: bookId, type}}}
        )

        if(!user) throw createError(403, 'You already reading this book');

        const filterBook = user.readBooks.filter(reading => reading.book.toString() === bookId);

        if(!filterBook.length) {
            await Book.findOneAndUpdate(
                {_id: bookId}, 
                {$inc: {numberOfReader: 1}}
            );
        }

        res.json({
            message: 'You started reading this book'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;