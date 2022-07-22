const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const Author = require('../../models/author');
const createError = require('http-errors');



router.get('/:collectionId', async (req, res, next) => {
    try {
        const {collectionId} = req.params;

        let collection = await BookCollection
            .findOne({_id: collectionId}, {__v: 0})
            .populate('books', '_id name image')
            .populate({ 
                path: 'books',
                select: '_id name image rating numberOfRating writer',
                populate: {
                 path: 'writer',
                 model: 'author',
                 select: 'name'
                }
             });


        if(!collection) throw createError(404, `Collection is not found`);

        if(collection.type === 'author') {
            collection = await BookCollection.findOne({_id: collectionId, type: 'author'}, {__v: 0});

            const authors = await Author.find({_id: {$in: collection.books}}, {_id: 1, name: 1, image: 1});

            collection = collection.toJSON();
            delete collection.books;
            collection.authors = authors ? authors : [];
        }

        res.json({
            message: 'Collection details',
            collection
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;