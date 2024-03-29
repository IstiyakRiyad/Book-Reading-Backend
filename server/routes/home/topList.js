const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Book = require('../../models/book');
const Publisher = require('../../models/publisher');



router.get('/', async (req, res, next) => {
    try {
        let {
            books: isBooks,
            publishers: isPublishers,
            authors: isAuthors
        } = req.query;

        if(!(isBooks || isAuthors || isPublishers)) {
            isBooks = 1,
            isPublishers = 1,
            isAuthors = 1
        }

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
        let authors, publishers, books;

        if(isAuthors) {
            const popularAuthor = await BookCollection.findOne(
                {type: 'author'},
                {__v: 0, type: 0, count: 0, books: {$slice: 7}}
            );
            authors = await Author.find({_id: {$in: popularAuthor.books}}, {_id: 1, name: 1, image: 1});    
        }
       
        // const popularWriter = popularAuthor.toJSON();
        // delete popularWriter.books;
        // popularWriter.authors = authors ? authors.toJSON() : [];
        
        // Publisher
        if(isPublishers) {
            collection = await BookCollection.findOne({type: 'publisher'}, {__v: 0});

            publishers = await Publisher.find({_id: {$in: collection.books}}, {__v: 0, books: 0});
        }

        if(isBooks) {
            books = await Book
                .find({}, {_id: 1, name: 1, image: 1, rating: 1, numberOfRating: 1, writer: 1, pdfFile: 1, audioFile: 1})
                .sort({_id: -1})
                .limit(15)
                .populate('writer', '_id name');
        }


        res.json({
            message: 'Top list details',
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