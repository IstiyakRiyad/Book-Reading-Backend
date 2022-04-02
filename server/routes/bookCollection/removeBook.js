const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');

// Constant
const bookClass = require('../../constants/bookClass');
const bookCollection = require('../../constants/bookCollection');
const authorCollection = require('../../constants/authorCollection');

const allCollections = {...bookClass, ...bookCollection, ...authorCollection};


router.patch('/:name', async (req, res, next) => {
    try {
        const {name} = req.params;

        const {id} = req.body;

        // Find the key
        if(!allCollections[name]) throw createError(404, `${name} is not found`);


        await BookCollection.findOneAndUpdate({name: allCollections[name]}, {$pull: {books: id}, $inc: {count: -1}});


        res.json({
            message: 'Item is removed from the collection successfully'
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;