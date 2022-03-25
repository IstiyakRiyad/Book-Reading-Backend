const router = require('express').Router();
const Author = require('../../models/author');
const Book = require('../../models/book');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const author = await Author.findOne({_id: id}, {__v: 0});

        if(!author) throw createError(404, 'Author not found');

        const books = await Book.find({writerId: author._id}, {_id: 1, name: 1, image: 1, rating: 1});


        const authorData = author.toJSON();
        authorData.books = books;

        res.json({
            message: 'All author details',
            author: authorData
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;