const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const bookCollection = await BookCollection
            .findOne({_id: id}, {__v: 0})
            .populate('books', '_id name image');

        if(!bookCollection) throw createError(404, 'BookCollection not found');


        res.json({
            message: 'BookCollection details',
            bookCollection
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;