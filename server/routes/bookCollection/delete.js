const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');


router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const collection = await BookCollection.findOneAndDelete({_id: id});

        if(!collection) throw createError(404, 'Collection not found');

        res.json({
            message: `${collection.name} book collection is deleted`
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;