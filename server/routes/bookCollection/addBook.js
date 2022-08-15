const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');

// Constant
const bookClass = require('../../constants/bookClass');
const bookCollection = require('../../constants/bookCollection');
const authorCollection = require('../../constants/authorCollection');
const publisherCollection = require('../../constants/publisherCollection');

const allCollections = {...bookClass, ...bookCollection, ...authorCollection, ...publisherCollection};


router.put('/:name', async (req, res, next) => {
    try {
        const {name} = req.params;

        const {id} = req.body;

        // Find the key
        if(!allCollections[name]) throw createError(404, `${name} is not found`);

        await BookCollection.findOneAndUpdate({name: allCollections[name]}, {$push: {books: id}, $inc: {count: 1}});


        res.json({
            message: 'Item is added to the collection successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;