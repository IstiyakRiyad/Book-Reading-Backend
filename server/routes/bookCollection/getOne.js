const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const Publisher = require('../../models/publisher');
const createError = require('http-errors');

// Constant
const bookClass = require('../../constants/bookClass');
const bookCollection = require('../../constants/bookCollection');
const authorCollection = require('../../constants/authorCollection');
const publisherCollection = require('../../constants/publisherCollection');

const allCollections = {...bookClass, ...bookCollection, ...authorCollection, ...publisherCollection};


router.get('/:name', async (req, res, next) => {
    try {
        const {name} = req.params;

        // Find the key
        if(!allCollections[name]) throw createError(404, `${name} is not found`);

        let author, publisher, book;
        if(authorCollection[name]) {
            const collection = await BookCollection.findOne({name: authorCollection[name], type: 'author'}, {__v: 0, type: 0});

            const authors = await Author.find({_id: {$in: collection.books}}, {_id: 1, name: 1, image: 1});

            author = collection.toJSON();
            delete author.books;
            author.authors = authors ? authors : [];
        }
        else if(publisherCollection[name]) {
            const collection = await BookCollection.findOne({name: publisherCollection[name], type: 'publisher'}, {__v: 0, type: 0});

            const publishers = await Publisher.find({_id: {$in: collection.books}}, {_id: 1, name: 1, image: 1});

            publisher = collection.toJSON();
            delete publisher.books;
            publisher.publishers = publishers ? publishers : [];
        }
        else {
            book = await BookCollection
                .findOne({name: allCollections[name], $or: [{type: 'class'}, {type:  'book'}]}, {__v: 0, type: 0})
                .populate('books', '_id name image');
        }


        res.json({
            message: 'Collection details',
            collection: author || publisher || book
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;