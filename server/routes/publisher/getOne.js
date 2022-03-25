const router = require('express').Router();
const Publisher = require('../../models/publisher');
const Book = require('../../models/book');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const publisher = await Publisher.findOne({_id: id}, {__v: 0});

        if(!publisher) throw createError(404, 'Publisher not found');

        // TODO: Adding publisher books
        const books = await Book.find({publisherId: publisher._id}, {_id: 1, name: 1, image: 1, rating: 1});


        const publisherData = publisher.toJSON();
        publisherData.books = books;
        
        
        res.json({
            message: 'All Publisher details',
            publisher: publisherData
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;