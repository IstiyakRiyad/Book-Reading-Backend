const router = require('express').Router();
const createError = require('http-errors');
const Book = require('../../models/book');
const User = require('../../models/user');


router.patch('/:bookId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {bookId} = req.params;
        const {type, page} = req.body;

        if(!(type === 'pdf' || type === 'audio')) throw createError(403, 'pdf and audio is only type option');
        
        await User.findOneAndUpdate(
            {_id: userId, 'readBooks.book': bookId, 'readBooks.type': type},
            {$set: {'readBooks.$.currentPage': page}}
        )

        res.json({
            message: `Your current is ${page}`
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;