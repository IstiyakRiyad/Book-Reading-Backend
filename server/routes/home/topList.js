const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Book = require('../../models/book');
const Publisher = require('../../models/publisher');



router.get('/', async (req, res, next) => {
    try {
        // Audio books
        // const audioBook = await Book.find(
        //     {audioFile: {$exists: true, $ne: null}}, 
        //     {_id: 1, name: 1, image: 1}
        // );

        // // Book Collections
        // const bookCollections = await BookCollection.find(
        //     {type: 'class'},
        //     {__v: 0, type: 0, count: 0, books: {$slice: 1}}
        // )
        // .sort({_id: -1})
        // .limit(5)
        // .populate('books', '_id name image');

        
        // Popular writers
        const popularAuthor = await BookCollection.findOne(
            {type: 'author'},
            {__v: 0, type: 0, count: 0, books: {$slice: 7}}
        );
        const authors = await Author.findOne({_id: {$in: popularAuthor.books}}, {_id: 1, name: 1, image: 1});

        const popularWriter = popularAuthor.toJSON();
        delete popularWriter.books;
        popularWriter.authors = authors ? authors.toJSON() : [];
        
        // Publisher
        const publishers = await Publisher
            .find({}, {__v: 0})
            .sort({_id: -1})
            .limit(15);


        const books = await Book
            .find({}, {_id: 1, name: 1, image: 1})
            .sort({_id: -1})
            .limit(15);


        res.json({
            message: 'Home details',
            books,
            publishers,
            authors
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;