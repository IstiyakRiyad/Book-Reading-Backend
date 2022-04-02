const router = require('express').Router();
const BookCollection = require('../../models/bookCollection');
const createError = require('http-errors');


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const series = await BookCollection
            .findOne({_id: id}, {__v: 0, count: 0, type: 0})
            .populate('books', '_id name image');

        if(!series) throw createError(404, 'Series not found');


        res.json({
            message: 'All author details',
            series: series
        });
    }
    catch(error) {
        next(error);
    }
});

module.exports = router;