const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Book = require('../../models/book');



router.get('/', async (req, res, next) => {
    try {
        // Book series
        const series = await BookCollection.find(
            {type: 'series'}, 
            {__v: 0, type: 0, count: 0}
        )
        .sort({_id: -1})
        .limit(5)
        .populate('books', 'image');


        // Book Collections
        const bookCollections = await BookCollection.find(
            {type: 'class'},
            {__v: 0, type: 0, count: 0, books: {$slice: 5}}
        )
        .limit(6)
        .populate('books', '_id name image');

        
        // Popular writers
        const popularAuthor = await BookCollection.findOne(
            {type: 'author'},
            {__v: 0, type: 0, count: 0, books: {$slice: 7}}
        );
        const authors = await Author.findOne({_id: {$in: popularAuthor.books}}, {_id: 1, name: 1, image: 1});

        const popularWriter = popularAuthor.toJSON();
        delete popularWriter.books;
        popularWriter.authors = authors ? authors.toJSON() : [];
        

        res.json({
            message: 'Home details',
            home: [
                {
                    name: 'Series',
                    series
                },
                {
                    name: 'Book Collection',
                    bookCollections
                },
                {
                    name: 'Popular Writer',
                    popularWriter
                }
            ]
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;