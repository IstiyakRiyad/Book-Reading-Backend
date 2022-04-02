const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Book = require('../../models/book');



router.get('/', async (req, res, next) => {
    try {
        // Book Collections
        const bookCollections = await BookCollection.find(
            {type: 'class'},
            {__v: 0, type: 0, count: 0, books: {$slice: 1}}
        )
        .populate('books', '_id name image');
        

        res.json({
            message: 'Home details',
            bookCollections
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;