const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const createError = require('http-errors');

// Constant
const bookClass = require('../../constants/bookClass');
const bookCollection = require('../../constants/bookCollection');
const authorCollection = require('../../constants/authorCollection');

const allCollections = {...bookClass, ...bookCollection, ...authorCollection};


router.get('/:name', async (req, res, next) => {
    try {
        const {name} = req.params;

         // Find the key
         if(!allCollections[name]) throw createError(404, `${name} is not found`);

        let author, book;
        if(authorCollection[name]) {
            const collection = await BookCollection.findOne({name: authorCollection[name], type: 'author'}, {__v: 0, type: 0});

            const authors = await Author.find({_id: {$in: collection.books}}, {_id: 1, name: 1, image: 1});

            author = collection.toJSON();
            delete author.books;
            author.authors = authors ? authors : [];
        }
        else {
            book = await BookCollection
                .findOne({name: allCollections[name], $or: [{type: 'class'}, {type:  'book'}]}, {__v: 0, type: 0})
                .populate('books', '_id name image');
        }


        res.json({
            message: 'Collection details',
            collection: author || book
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;