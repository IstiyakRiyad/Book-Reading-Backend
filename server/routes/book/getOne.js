const router = require('express').Router();
const Book = require('../../models/book');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const book = await Book
            .findOne({_id: id}, {__v: 0, likes: 0, comments: {$slice: 100}})
            .populate('writer publisher category subCategory comments.user', '_id name image');

        if(!book) throw createError(404, 'Book not found');


        res.json({
            message: 'Book details',
            book
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;