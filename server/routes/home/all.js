const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Book = require('../../models/book');



router.get('/', async (req, res, next) => {
    try {
        // Different types of collections
        const bookClass = await BookCollection.find(
            {type: 'book'},
            {__v: 0, type: 0, count: 0, books: {$slice: 5}}
        )
        .populate({ 
            path: 'books',
            select: '_id name image rating numberOfRating writer',
            populate: {
             path: 'writer',
             model: 'author',
             select: 'name'
            }
         });

        // Book series
        const series = await BookCollection.find(
            {type: 'series'}, 
            {__v: 0, type: 0, count: 0}
        )
        .sort({_id: -1})
        .limit(5)
        .populate('books', 'image');


        // Audio books
        const audioBook = await Book.find(
            {audioFile: {$exists: true, $ne: null}}, 
            {_id: 1, name: 1, image: 1, rating: 1, numberOfRating: 1, writer: 1}
        )
        .sort({_id: -1})
        .limit(5)
        .populate('writer', '_id name');

        // Book Collections
        const bookCollections = await BookCollection.find(
            {type: 'class'},
            {__v: 0, type: 0, count: 0, books: {$slice: 1}}
        )
        .sort({_id: -1})
        .limit(5)
        .populate({ 
            path: 'books',
            select: '_id name image rating numberOfRating writer',
            populate: {
             path: 'writer',
             model: 'author',
             select: 'name'
            }
         });

        
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
                ...bookClass,
                {
                    name: 'Series',
                    series
                },
                {
                    name: 'Audio Books',
                    audioBook
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